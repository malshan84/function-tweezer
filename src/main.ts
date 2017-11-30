import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as UserInfoEvents from './events/UserInfoEvents';
import RouteServer from './RouteServer';

let mainWindow: Electron.BrowserWindow;

function initialize() {
    RouteServer.createRouteServer(UserInfoEvents.getProtNum(), mainWindow);
    UserInfoEvents.registEvent();
}

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    console.log('start electron');
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../../public/index.html'),
        protocol: 'file:',
        slashes: true
    });

    // hide menu bar
    mainWindow.setMenu(null);

    mainWindow.loadURL(startUrl);

    mainWindow.webContents.openDevTools();

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