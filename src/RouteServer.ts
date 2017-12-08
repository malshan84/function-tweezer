import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as LogCollector from 'log-collector';
import * as UserinfoApi from './api/UserInfo';
import { UserInfo, SvcKind } from './api/UserInfo';


interface IReqInfo {
    start: number;
    end: number;
    localPath: string;
}

export default class RouteServer {
    private static instance: RouteServer = undefined;
    private _mainWindow: Electron.BrowserWindow;
    private _app: express.Express;
    private _server: http.Server;

    private constructor(port: number, mainWindow: Electron.BrowserWindow) {       
        this._mainWindow = mainWindow;
        this._app = express();
        this._app.use(bodyParser.json());
        this._server = http.createServer(this._app);
        this._server.listen(port);
    }
    public static createRouteServer(port: number, mainWindow: Electron.BrowserWindow) {
        this.instance = new RouteServer(port, mainWindow);
        return this.instance;
    }

    public static getInstance(): RouteServer {
        if ( this.instance === undefined ) {
            console.error('you must create RouteServer');
            return undefined;
        } else {
            return this.instance;
        }
    }

    public addEvent(eventName: string, event: (req: express.Request) => any) {
        this._app.post(`/${eventName}`, (req: express.Request, res: express.Response) => {
            const mainWindow = this._mainWindow;
            function callEvent() {
                mainWindow.webContents.send(eventName, event(req));
            }
            callEvent();      
            res.on('OK', callEvent);
        });
    }    

    public addShowLogEvent(eventName: string) {
        this._app.post(`/${eventName}`, (req: express.Request, res: express.Response) => {
            console.log(req.body);
            const reqInfo: IReqInfo = req.body;
            let userInfo: UserInfo = UserinfoApi.getUserInfo(SvcKind.SVN);
            const gitLogCollector = new LogCollector({ username: userInfo.id, password: userInfo.pw, kind: 'git' });
            gitLogCollector.getLogWithRange(
                reqInfo.localPath,
                { startLine: reqInfo.start, endLine: reqInfo.end },
                10,
                (err: string | null, revs: Log.RevisionInfo[]) => {
                    if (err !== null) {
                        console.log(err);
                    } else {
                        this._mainWindow.webContents.send(eventName, revs);
                    }
                }
            );
        });
    }

    public changePort(port: number) {
        this._server.close();
        this._server.listen(port);
    }
}