"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function listenEvent(eventName, func) {
    electron_1.ipcRenderer.on(eventName, function (event, args) {
        func(args);
    });
}
exports.listenEvent = listenEvent;
//# sourceMappingURL=RouteClient.js.map