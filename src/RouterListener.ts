import { ipcRenderer } from 'electron';

export function listenEvent(eventName: string, listener: (args: any) => void ) {
    ipcRenderer.on(eventName, (event: Electron.Event, args: any) => {
        listener(args);
    });
}