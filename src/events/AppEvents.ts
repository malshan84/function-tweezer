import RouteServer from '../RouteServer';
import { listenEvent } from '../RouteClient';

const GET_LOG = 'getlog'; 

export function createRouteServer(port: number, mainWindow: Electron.BrowserWindow) {
    RouteServer.createRouteServer(port, mainWindow);
}

export function registEvent() {
    getLog();
}

function getLog() {
    RouteServer.getInstance().addEvent(GET_LOG, (req): any => {
        return req.body;
    });
}

export function listenGetLog(eventFunc: (args: any) => void) {
    listenEvent(GET_LOG, (args: any) => {
        eventFunc(args);
    });
}