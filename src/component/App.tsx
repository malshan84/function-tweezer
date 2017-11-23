import * as React from 'react';
import { ipcRenderer } from 'electron';
import { listenGetLog } from '../events/AppEvents';

interface AppState {
   port: number;
   startLine: number;
   endLine: number;
   sourceFile: string;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        const portNum: number = ipcRenderer.sendSync('getPort', 'i need port num');
        this.state = {
            port: portNum,
            startLine: 0,
            endLine: 0,
            sourceFile: ''
        };
    }
    
    render() {
        listenGetLog((args: AppState) => {
            this.setState(args);
        });
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    port is : {this.state.port} <br/>
                    start line : {this.state.startLine} <br/>
                    end line : {this.state.endLine} <br/>
                    source file : {this.state.sourceFile}
                </p>
            </div>
        );
    }
}

export default App;
