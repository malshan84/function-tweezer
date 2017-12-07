import * as LogCollector from 'log-collector';
import RouteServer from '../RouteServer';
import { ipcRenderer } from 'electron';
import * as UserinfoApi from '../api/UserInfo';
import { UserInfo, SvcKind } from '../api/UserInfo';

interface ReqInfo {
    start: number;
    end: number;
    localPath: string;
}

const SHOW_LOG = 'SHOW_LOG';
function showLogEvent() {
    let userInfo: UserInfo = UserinfoApi.getUserInfo(SvcKind.SVN);
    const gitLogCollector = new LogCollector({username: userInfo.id, password: userInfo.pw, kind: 'git'});
    RouteServer.getInstance().addEvent(SHOW_LOG, (req): any => {
        console.log(req.body);
        const reqInfo: ReqInfo = req.body;
        let infos: Log.RevisionInfo[];

        gitLogCollector.getLogWithRange(
            reqInfo.localPath, 
            {startLine: reqInfo.start, endLine: reqInfo.end}, 
            100, 
            (err: string|null, revs: Log.RevisionInfo[]) => {
                if ( err !== null ) {
                    console.log('error!!');
                } else {
                    infos = revs;
            }
        });

        return infos;
    });
}

export function listenShowLog(eventFunc: (revisions: string[]) => void) { 
    ipcRenderer.on(SHOW_LOG, (event: Electron.Event, revisions: any) => { 
        eventFunc(revisions);
    }); 
}

export function registEvents () {
    showLogEvent();
}