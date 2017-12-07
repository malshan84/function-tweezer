import * as LogCollector from 'log-collector';
import RouteServer from '../RouteServer';
import { ipcRenderer } from 'electron';
import * as UserinfoApi from '../api/UserInfo';
import { UserInfo, SvcKind } from '../api/UserInfo';

let gitLogCollector: Log.LogCollector;

interface IReqInfo {
    start: number;
    end: number;
    localPath: string;
}

export interface IRevisionInfo {
    revnum: string;
    author: string;
    message: string;
    date: string;
    diff: string;
}

let infos: Log.RevisionInfo[];
function getRevInfos(err: string | null, revs: Log.RevisionInfo[]) {
    var promise = new Promise((resolve, reject) => {
        if (err !== null) {
            console.log('error!!');
            reject('error'); // pass values
        } else {
            infos = revs;
            console.log(infos);
            resolve('done'); // pass values
        }
    });
    return promise;
}

const SHOW_LOG = 'SHOW_LOG';
function showLogEvent() {
    let userInfo: UserInfo = UserinfoApi.getUserInfo(SvcKind.SVN);
    gitLogCollector = new LogCollector({username: userInfo.id, password: userInfo.pw, kind: 'git'});
    RouteServer.getInstance().addEvent(SHOW_LOG, (req): any => {
        console.log(req.body);
        const reqInfo: IReqInfo = req.body; 

        gitLogCollector.getLogWithRange(
            reqInfo.localPath, 
            {startLine: reqInfo.start, endLine: reqInfo.end}, 
            10,
            getRevInfos
        );
    });
    return infos;
}

export function listenShowLog(eventFunc: (revisions: IRevisionInfo[]) => void) { 
    ipcRenderer.on(SHOW_LOG, (event: Electron.Event, revisions: IRevisionInfo[]) => {
        eventFunc(revisions);
    }); 
}

export function registEvents () {
    showLogEvent();
}