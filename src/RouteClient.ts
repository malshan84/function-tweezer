import { ipcRenderer } from 'electron';
export function listenEvent(eventName: string, func: (args: any) => void ) {
    ipcRenderer.on(eventName, (event: Electron.Event, args: any) => {
        func(args);
    });
}