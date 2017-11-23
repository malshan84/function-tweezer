"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var AppEvents_1 = require("./events/AppEvents");
var mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({ width: 800, height: 600 });
    console.log('start electron');
    var startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../../public/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    electron_1.ipcMain.on('getPort', function (event, arg) {
        console.log(arg);
        event.returnValue = 8000;
    });
    AppEvents_1.createRouteServer(8080, mainWindow);
    AppEvents_1.registEvent();
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map