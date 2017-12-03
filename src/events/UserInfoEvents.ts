import { ipcRenderer, ipcMain } from 'electron';
import * as PortApi from '../api/Port';
import * as UserInfoApi from '../api/UserInfo';
import { SvcKind, UserInfo } from '../api/UserInfo';

/**
 * SAVE_USER_INFO
 */
const SAVE_USER_INFO = 'SAVE_USER_INFO';
export function saveUserInfoEvent(userInfo: UserInfo): Boolean {
    return ipcRenderer.sendSync(SAVE_USER_INFO, userInfo);
}

function listenSaveUserInfoEvent() {
    ipcMain.on(SAVE_USER_INFO, (event: Electron.Event, userInfo: UserInfo) => {
        UserInfoApi.setUserInfo(userInfo);
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
    ipcMain.on(REQUEST_USER_INFO, (event: Electron.Event, kind: SvcKind) => {
        event.returnValue = UserInfoApi.getUserInfo(kind);   
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
        event.returnValue = UserInfoApi.hasUserInfo();
    });
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
        event.returnValue = PortApi.savePortNum(portNum);
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
        event.returnValue = PortApi.getProtNum();
    });
}

export function registEvent() {
    listenRequestPortNumEvent();
    listenSavePortNumEvent();
    listenRequestHasInfoEvent();
    listenRequestUserInfoEvent();
    listenSaveUserInfoEvent();
}
