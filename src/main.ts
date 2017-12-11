import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as UserInfoEvents from './events/UserInfoEvents';
import RouteServer from './RouteServer';
import * as GlobalEvent from './events/GlobalEvents';
import * as UserInfoApi from './api/UserInfo';
import * as PortApi from './api/Port';
import * as LogCollectEvent from './events/LogCollectEvents';

let mainWindow: Electron.BrowserWindow;

function initialize() {
    RouteServer.createRouteServer(PortApi.getProtNum(), mainWindow);
    UserInfoEvents.registEvents();
    GlobalEvent.listenRequestHasInfoEvent(loadURL);
    if (UserInfoApi.hasUserInfo()) {
        loadURL('functionHistory');
    } else {
        loadURL('setting');
    }
    LogCollectEvent.registEvents();
}

function loadURL(hashStr: string) {
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../../public/index.html'),
        protocol: 'file:',
        slashes: true,
        hash: hashStr
    });

    mainWindow.loadURL(startUrl);
}

function createWindow() {
    mainWindow = new BrowserWindow({ width: 1250, height: 800, icon: __dirname + './../../public/tweezer_ico.ico' });
    console.log('start electron');

    // hide menu bar
    mainWindow.setMenu(null);
    
    mainWindow.webContents.openDevTools({mode: 'detach'});
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    ipcMain.on('getPort', (event: Electron.Event, arg: string) => {
        console.log(arg);
        event.returnValue = 8000;
    });
    initialize();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});