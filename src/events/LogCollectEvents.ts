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
export function showLogEvent() {
    let userInfo: UserInfo = UserinfoApi.getUserInfo(SvcKind.SVN);
    const gitLogCollector = new LogCollector({username: userInfo.id, password: userInfo.pw, kind: 'git'});
    RouteServer.getInstance().addEvent(SHOW_LOG, (req): any => {
        const reqInfo: ReqInfo = req.body;
        let logs: string[];
        gitLogCollector.getLogWithRange(
            reqInfo.localPath, 
            {startLine: reqInfo.start, endLine: reqInfo.end}, 
            100, 
            (err: string|null, revs: string[]) => {
                if ( err !== null ) {
                    // error
                } else {
                    logs = revs;
            }
        });
        return logs; 
    });
}

export function listenGetLog(eventFunc: (args: string) => void) { 
    listenEvent(SHOW_LOG, (args: string) => { 
        eventFunc(args); 
    }); 
}

function listenEvent(eventName: string, func: (args: string) => void ) { 
    ipcRenderer.on(eventName, (event: Electron.Event, args: any) => { 
        func(args); 
    }); 
}