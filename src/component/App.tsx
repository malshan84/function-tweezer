import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Setting from './Setting';
import FunctionHistoryView from './FunctionHistoryView';
import { remote } from 'electron';

class App extends React.Component<{}, {}> {
    
    close = () => {
        remote.getCurrentWindow().close();
    }
    minimize = () => {
        remote.getCurrentWindow().minimize();
    }
    maximize = () => {
        if (remote.getCurrentWindow().isMaximized()) {
            remote.getCurrentWindow().unmaximize();
        } else {
            remote.getCurrentWindow().maximize();
        }
    }

    render() {
        return (
            <div>
                <nav id="titleBar">
                    <div id="titleLogo">  
                        <img id="logo" src="logo_black.png"/>        
                    </div>
                    <div id="windowButton">
                        <div id="buttons">
                            <Icon id="minimize" name="window minimize" onClick={() => this.minimize()}/>
                            <Icon id="maximize" name="window maximize" onClick={() => this.maximize()}/>
                            <Icon id="close" name="close" onClick={() => this.close()}/>
                        </div>
                    </div>
                </nav>
                <HashRouter>
                    <div>
                    <Route exact={true} path="/setting" component={Setting} />
                    <Route path="/functionHistory" component={FunctionHistoryView} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default App;
