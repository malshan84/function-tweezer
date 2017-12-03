import * as settings from 'electron-settings';

export interface UserInfo {
    kind: number;
    url: string;
    id: string;
    pw: string;
}

export enum SvcKind {
    SVN,
    GIT
}

const USER_INFO = 'userinfo_';
const USER_INFO_GIT = USER_INFO + SvcKind.GIT;
const USER_INFO_SVN = USER_INFO + SvcKind.SVN;

export function setUserInfo (userInfo: UserInfo) {
    console.log(userInfo);
    settings.set(USER_INFO + userInfo.kind, {
        url: userInfo.url,
        id: userInfo.id,
        pw: userInfo.pw
    });     
}

export function getUserInfo (_kind: SvcKind): UserInfo {
    let userInfo: UserInfo = {
        kind: _kind,
        url: '',
        id: '',
        pw: ''
    };
    if (settings.has(USER_INFO + _kind)) {
        userInfo.kind =  _kind;
        userInfo.url = settings.get(`${USER_INFO + _kind}.url`).toString();
        userInfo.id = settings.get(`${USER_INFO + _kind}.id`).toString();
        userInfo.pw = settings.get(`${USER_INFO + _kind}.pw`).toString();
    }

    return userInfo;
}

export function hasUserInfo(): boolean {
    return settings.has(USER_INFO_SVN) || settings.has(USER_INFO_GIT);
}