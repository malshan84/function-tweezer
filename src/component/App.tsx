import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Setting from './Setting';
import FunctionHistoryView from './FunctionHistoryView';

class App extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        
    }
    
    render() {
        return (
            <HashRouter>
                <div>
                   <Route exact={true} path="/setting" component={Setting} />
                   <Route path="/functionHistory" component={FunctionHistoryView} />
                </div>
            </HashRouter>
        );
    }
}

export default App;
