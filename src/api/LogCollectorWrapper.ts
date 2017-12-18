import { LogCollector, RevisionInfo } from 'log-collector';
import * as LogCollectorUtils from 'log-collector';
import { UserInfo } from './UserInfo';

export interface IFileLineInfo {
    start: number;
    end: number;
    localPath: string;
    description: string;
}

export default class LogCollectorWrapper {
    private static instance: LogCollectorWrapper = undefined;
    private _logCollector: LogCollector;

    private constructor(userInfo: UserInfo, kind: string) {
        
        this._logCollector = new LogCollector({ username: userInfo.id, password: userInfo.pw, kind });
    }

    public static createLogCollector(userInfo: UserInfo, kind: string) {
        this.instance = new LogCollectorWrapper(userInfo, kind);
        return this.instance;
    }

    public static getInstance(): LogCollectorWrapper {
        if ( this.instance === undefined ) {
            console.error('you must create LogCollector');
            return undefined;
        } else {
            return this.instance;
        }
    }

    public getLog
    (
        fileLineInfo: IFileLineInfo,
        callback: (err: string|null, revisions: RevisionInfo[]) => void 
    ): void {
        this._logCollector.getLogWithRange(
            fileLineInfo.localPath,
            { startLine: fileLineInfo.start, endLine: fileLineInfo.end },
            10,
            callback);
    }

    public getNextLog (callback: (err: string|null, revisions: RevisionInfo[]) => void ): void {
        this._logCollector.getNextLogWithRange(10, callback);
    }
}

export function getSCMKind(localPath: string): string {
    return LogCollectorUtils.getSCMKind(localPath);
}