import * as React from 'react';
import * as UserInfoEvent from '../events/UserInfoEvents';
import { SvcKind, UserInfo } from '../events/UserInfoEvents';

class App extends React.Component<{}, UserInfo> {
    constructor(props: {}) {
        super(props);
        //has user info??
        if (UserInfoEvent.requestHasInfoEvent()) {
            console.log('i have user info');
        } else {
            console.log('i have no user info');
        }
        //make state
        this.state = {
            kind: SvcKind.GIT,
            id: 'malshan',
            pw: 'my pw',
            url: 'http://.....'
        };
        //save state
        UserInfoEvent.saveUserInfoEvent(this.state);
        //change state
        this.state = {
            kind: SvcKind.SVN,
            id: 'haha',
            pw: 'hoho',
            url: 'http://.....'
        };
        //get state
        this.state = UserInfoEvent.requestUserInfoEvent(SvcKind.GIT);

        //change port(default : 8080)
        UserInfoEvent.savePortNumEvent(6060);
        console.log(UserInfoEvent.requestPortNumEvent());
    }
    
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    kind is : {this.state.kind} <br/>
                    id line : {this.state.id} <br/>
                    pw line : {this.state.pw} <br/>
                    url file : {this.state.url}
                </p>
            </div>
        );
    }
}

export default App;
