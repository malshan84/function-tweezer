import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Setting from './Setting';
import Waiting from './Waiting';

class App extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        
    }
    
    render() {
        return (
            <HashRouter>
                <div>
                   <Route exact={true} path="/waiting" component={Waiting} />
                   <Route exact={true} path="/setting" component={Setting} />
                </div>
            </HashRouter>
        );
    }
}

export default App;
