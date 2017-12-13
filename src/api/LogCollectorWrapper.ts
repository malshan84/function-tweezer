import { LogCollector, RevisionInfo, getSCMKind } from 'log-collector';
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
    private _callback: (err: string|null, revisions: RevisionInfo[]) => void;

    private constructor(userInfo: UserInfo, localPath: string) {
        
        this._logCollector = new LogCollector({ username: userInfo.id, password: userInfo.pw, kind: getSCMKind(localPath) });
    }

    public static createLogCollector(userInfo: UserInfo, localPath: string) {
        this.instance = new LogCollectorWrapper(userInfo, localPath);
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
        this._callback = callback;
        this._logCollector.getLogWithRange(
            fileLineInfo.localPath,
            { startLine: fileLineInfo.start, endLine: fileLineInfo.end },
            10,
            callback);
    }

    public getNextLog (): void {
        this._logCollector.getNextLogWithRange(10, this._callback);
    }
}