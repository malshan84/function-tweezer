import * as settings from 'electron-settings';
import RouteServer from '../RouteServer';

const DEFAULT_PORT_NUM = 8080;
const PORT_NUM = 'port_num';

export function getProtNum(): number {
    if (settings.has(PORT_NUM)) {
        const portNum = settings.get(PORT_NUM);
        if (typeof portNum === 'number') {
            return portNum;
        }
    }
    return DEFAULT_PORT_NUM;   
}

export function savePortNum(portNum: number): boolean {
    console.log(`port num : ${portNum}`);
    settings.set(PORT_NUM, portNum);
    RouteServer.getInstance().changePort(portNum);
    return true;
}