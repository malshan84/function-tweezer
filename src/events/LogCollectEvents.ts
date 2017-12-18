import { ipcRenderer, ipcMain } from 'electron';
import RouteServer from '../RouteServer';
import LogCollectorWrapper, { IFileLineInfo, getSCMKind } from '../api/LogCollectorWrapper';
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
            let kind: SvcKind;
            if (getSCMKind(fileLineInfo.localPath) === 'git') {
                kind = SvcKind.GIT;
            } else {
                kind = SvcKind.SVN;
            }
            let userInfo: UserInfo = UserinfoApi.getUserInfo(kind);
            LogCollectorWrapper.createLogCollector(userInfo, getSCMKind(fileLineInfo.localPath));
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

const NEXT_LOG = 'NEXT_LOG';

function nextLogEvent() {
    ipcMain.on(SHOW_LOG, (event: Electron.Event, eventFunc: (revisions: IRevisionInfo[]) => void) => {
        LogCollectorWrapper.getInstance().getNextLog((err: string | null, revs: RevisionInfo[]) => {
            if (err !== null) {
                console.log(err);
            } else {
                eventFunc(revs);
            }
        });
    });
}

export function requestNextLog(eventFunc: (revisions: IRevisionInfo[]) => void) {
    return ipcRenderer.send(NEXT_LOG, eventFunc);
}

export function registEvents () {
    showLogEvent();
    nextLogEvent();
}