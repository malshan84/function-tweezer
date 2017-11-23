"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteServer_1 = require("../RouteServer");
var RouteClient_1 = require("../RouteClient");
var GET_LOG = 'getlog';
function createRouteServer(port, mainWindow) {
    RouteServer_1.default.createRouteServer(port, mainWindow);
}
exports.createRouteServer = createRouteServer;
function registEvent() {
    getLog();
}
exports.registEvent = registEvent;
function getLog() {
    RouteServer_1.default.getInstance().addEvent(GET_LOG, function (req) {
        return req.body;
    });
}
function listenGetLog(eventFunc) {
    RouteClient_1.listenEvent(GET_LOG, function (args) {
        eventFunc(args);
    });
}
exports.listenGetLog = listenGetLog;
//# sourceMappingURL=AppEvents.js.map