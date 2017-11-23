"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app);
server.listen(8000);
function Add() {
    app.get('/getLog', function (req, res) {
        var getLog = {
            port: 8080,
            startLine: 100,
            endLine: 200,
            sourceFile: 'hello.cpp'
        };
        Electron.BrowserWindow.fromId(0).webContents.send('getLog', getLog);
        res.send('OK!!');
    });
}
exports.default = Add;
//# sourceMappingURL=server.js.map