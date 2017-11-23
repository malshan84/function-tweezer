"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteServer_1 = require("../RouteServer");
function getLog() {
    RouteServer_1.default.getInstance().addEvent('getlog', function (req) {
        return req.body;
    });
}
exports.getLog = getLog;
//# sourceMappingURL=events.js.map