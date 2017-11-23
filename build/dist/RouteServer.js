"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var RouteServer = /** @class */ (function () {
    function RouteServer(port, mainWindow) {
        this._mainWindow = mainWindow;
        this._app = express();
        this._app.use(bodyParser.json());
        this._server = http.createServer(this._app);
        this._server.listen(port);
    }
    RouteServer.createRouteServer = function (port, mainWindow) {
        this.instance = new RouteServer(port, mainWindow);
        return this.instance;
    };
    RouteServer.getInstance = function () {
        if (this.instance === undefined) {
            console.error('you must create RouteServer');
            return undefined;
        }
        else {
            return this.instance;
        }
    };
    RouteServer.prototype.addEvent = function (eventName, event) {
        var _this = this;
        this._app.post("/" + eventName, function (req, res) {
            _this._mainWindow.webContents.send(eventName, event(req));
            res.send(req.body);
        });
    };
    RouteServer.prototype.changePort = function (port) {
        this._server.listen(port);
    };
    RouteServer.instance = undefined;
    return RouteServer;
}());
exports.default = RouteServer;
//# sourceMappingURL=RouteServer.js.map