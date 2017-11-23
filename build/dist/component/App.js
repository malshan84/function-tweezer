"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var electron_1 = require("electron");
var AppEvents_1 = require("../events/AppEvents");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        var portNum = electron_1.ipcRenderer.sendSync('getPort', 'i need port num');
        _this.state = {
            port: portNum,
            startLine: 0,
            endLine: 0,
            sourceFile: ''
        };
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        AppEvents_1.listenGetLog(function (args) {
            _this.setState(args);
        });
        return (React.createElement("div", { className: "App" },
            React.createElement("div", { className: "App-header" },
                React.createElement("h2", null, "Welcome to React")),
            React.createElement("p", { className: "App-intro" },
                "port is : ",
                this.state.port,
                " ",
                React.createElement("br", null),
                "start line : ",
                this.state.startLine,
                " ",
                React.createElement("br", null),
                "end line : ",
                this.state.endLine,
                " ",
                React.createElement("br", null),
                "source file : ",
                this.state.sourceFile)));
    };
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=App.js.map