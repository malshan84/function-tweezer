import { ipcRenderer } from 'electron';
import RouteServer from '../RouteServer';

export interface IRevisionInfo {
    name: string;
    author: string;
    message: string;
    date: string;
    diff: string;
}

const SHOW_LOG = 'SHOW_LOG';
function showLogEvent() {    
    RouteServer.getInstance().addShowLogEvent(SHOW_LOG);    
}

export function listenShowLog(eventFunc: (revisions: IRevisionInfo[]) => void) {
    ipcRenderer.on(SHOW_LOG, (event: Electron.Event, revisions: IRevisionInfo[]) => {
        eventFunc(revisions);
    });
}

export function registEvents () {
    showLogEvent();
}