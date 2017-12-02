import { ipcRenderer, ipcMain } from 'electron';
import * as settings from 'electron-settings';
import RouteServer from '../RouteServer';

export enum SvcKind {
    SVN,
    GIT
}

const DEFAULT_PORT_NUM = 8080;

const USER_INFO = 'userinfo_';
const USER_INFO_GIT = USER_INFO + SvcKind.GIT;
const USER_INFO_SVN = USER_INFO + SvcKind.SVN;
const PORT_NUM = 'port_num';

export interface UserInfo {
    kind: number;
    url: string;
    id: string;
    pw: string;
}

/**
 * SAVE_USER_INFO
 */
const SAVE_USER_INFO = 'SAVE_USER_INFO';
export function saveUserInfoEvent(userInfo: UserInfo): Boolean {
    return ipcRenderer.sendSync(SAVE_USER_INFO, userInfo);
}

function listenSaveUserInfoEvent() {
    ipcMain.on(SAVE_USER_INFO, (event: Electron.Event, userInfo: UserInfo) => {
        console.log(userInfo);
        settings.set(USER_INFO + userInfo.kind, {
            url: userInfo.url,
            id: userInfo.id,
            pw: userInfo.pw
        });     
        event.returnValue = true;
    });
}

/**
 * REQUEST_USER_INFO
 */
const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export function requestUserInfoEvent(kind: SvcKind) {
    return ipcRenderer.sendSync(REQUEST_USER_INFO, kind);
}

function listenRequestUserInfoEvent() {
    ipcMain.on(REQUEST_USER_INFO, (event: Electron.Event, _kind: SvcKind) => {
        if (settings.has(USER_INFO + _kind)) {
            event.returnValue = {
                kind: _kind,
                url: settings.get(`${USER_INFO + _kind}.url`),
                id: settings.get(`${USER_INFO + _kind}.id`),
                pw: settings.get(`${USER_INFO + _kind}.pw`)
            };
        } else {
            event.returnValue = {
                kind: _kind,
                url: '',
                id: '',
                pw: ''
            };
        }        
    });
}

/**
 * REQUEST_HAS_INFO
 */
const REQUEST_HAS_INFO = 'REQUEST_HAS_INFO';
export function requestHasInfoEvent(): boolean {
    return ipcRenderer.sendSync(REQUEST_HAS_INFO, 'Has info??');
}

function listenRequestHasInfoEvent() {
    ipcMain.on(REQUEST_HAS_INFO, (event: Electron.Event, message: string) => {
        console.log(USER_INFO_GIT);
        console.log(USER_INFO_SVN);
        event.returnValue = hasUserInfo();
    });
}

export function hasUserInfo(): boolean {
    return settings.has(USER_INFO_SVN) || settings.has(USER_INFO_GIT);
}

/**
 * SAVE_PORT_NUM
 */
const SAVE_PORT_NUM = 'SAVE_PORT_NUM';
export function savePortNumEvent(portNum: number): Boolean {
    return ipcRenderer.sendSync(SAVE_PORT_NUM, portNum);
}

function listenSavePortNumEvent() {
    ipcMain.on(SAVE_PORT_NUM, (event: Electron.Event, portNum: number) => {
        console.log(`port num : ${portNum}`);
        settings.set(PORT_NUM, portNum);
        RouteServer.getInstance().changePort(portNum);
        event.returnValue = true;
    });
}

/**
 * REQUEST_PORT_NUM
 */
const REQUEST_PORT_NUM = 'REQUEST_PORT_NUM';
export function requestPortNumEvent(): number {
    return ipcRenderer.sendSync(REQUEST_PORT_NUM, 'Has info??');
}

function listenRequestPortNumEvent() {
    ipcMain.on(REQUEST_PORT_NUM, (event: Electron.Event, message: string) => {
        if (settings.has(PORT_NUM)) {
            event.returnValue = getProtNum();
        } else {
            event.returnValue = 8080;
        }   
    });
}

export function getProtNum(): number {
    if (settings.has(PORT_NUM)) {
        const portNum = settings.get(PORT_NUM);
        if (typeof portNum === 'number') {
            return portNum;
        }
    }
    return DEFAULT_PORT_NUM;   
}

export function registEvent() {
    listenRequestPortNumEvent();
    listenSavePortNumEvent();
    listenRequestHasInfoEvent();
    listenRequestUserInfoEvent();
    listenSaveUserInfoEvent();
}
