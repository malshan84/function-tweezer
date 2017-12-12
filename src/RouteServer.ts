import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';

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

    public addEvent(eventName: string, event: (req: express.Request, send: (...arg: any[]) => void
    ) => void) {
        const mainWindow: Electron.BrowserWindow = this._mainWindow;

        this._app.post(`/${eventName}`, (req: express.Request, res: express.Response) => {
            if (mainWindow === undefined ) {
                console.log('undfined!!');
            }
            function send (...arg: any[]) {
                mainWindow.webContents.send(eventName, arg[0]);
                console.log('send ok');
                res.send('OK');
            }
            event(req, send);  
        });
    }

    public changePort(port: number) {
        this._server.close();
        this._server.listen(port);
    }
}