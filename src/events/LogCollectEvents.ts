import { ipcRenderer } from 'electron';
import RouteServer from '../RouteServer';
import LogCollectorWrapper, { IFileLineInfo } from '../api/LogCollectorWrapper';
import { UserInfo, SvcKind } from '../api/UserInfo';
import * as UserinfoApi from '../api/UserInfo';
import { RevisionInfo } from 'log-collector';

export interface IRevisionInfo {
    name: string;
    author: string;
    message: string;
    date: string;
    diff: string;
}

const SHOW_LOG = 'SHOW_LOG';

function showLogEvent() {
    RouteServer.getInstance().addEvent(
        SHOW_LOG,
        (req, send) => {
            const fileLineInfo: IFileLineInfo = req.body;
            let userInfo: UserInfo = UserinfoApi.getUserInfo(SvcKind.SVN);
            LogCollectorWrapper.createLogCollector(userInfo, fileLineInfo.localPath);
            LogCollectorWrapper.getInstance().getLog(fileLineInfo, (err: string | null, revs: RevisionInfo[]) => {
                if (err !== null) {
                    console.log(err);
                } else {
                    send(revs);
                }
            });
        }
    );
}

export function listenShowLog(eventFunc: (revisions: IRevisionInfo[]) => void) {
    ipcRenderer.on(SHOW_LOG, (event: Electron.Event, revisions: IRevisionInfo[]) => {
        eventFunc(revisions);
    });
}

export function removeListenerShowLog() {
    ipcRenderer.removeAllListeners(SHOW_LOG);

}

export function registEvents () {
    showLogEvent();
}