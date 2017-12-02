
import { ipcRenderer, ipcMain } from 'electron';

const RELOAD_URL = 'RELOAD_URL';
export function requestHasInfoEvent(hash: string): boolean {
    return ipcRenderer.sendSync(RELOAD_URL, hash);
}

export function listenRequestHasInfoEvent(reloadUrl: (hash: string) => void ) {
    ipcMain.on(RELOAD_URL, (event: Electron.Event, hash: string) => {
        reloadUrl(hash);
        event.returnValue = true;
    });
}