import * as React from 'react';
import * as UserInfoEvent from '../events/UserInfoEvents';
import { SvcKind, UserInfo } from '../events/UserInfoEvents';

class SettingScm extends React.Component<{type: SvcKind, addSaveEventListener: Function}, UserInfo> {

   svc: string;

   constructor(props: {type: SvcKind, addSaveEventListener: Function}) {
       super(props);
      
       this.state = UserInfoEvent.requestUserInfoEvent(this.props.type);
       
       this.saveEventListener = this.saveEventListener.bind(this);   
       this.props.addSaveEventListener(this.saveEventListener);

       if (this.props.type === SvcKind.GIT) {
           this.svc = 'git';
       } else {
           this.svc = 'svn';
       }

    } 
    
    saveEventListener(): void {
        UserInfoEvent.saveUserInfoEvent(this.state);
    }

    onUrlChangeListener(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({...this.state, url: event.target.value});
    }

    render() {
        return (
           
            <div className={this.svc + '-htm'}>
                    <div className="group">
                        <label htmlFor={this.svc + '_url'} className="label">URL</label>
                        <input 
                            id={this.svc + '_url'}
                            type="text" 
                            className="input" 
                            value={this.state.url} 
                            onChange={(event) => {this.setState({...this.state, url: event.target.value}); }}
                        />
                    </div>
                    <div className="group">
                        <label htmlFor={this.svc + 'id'} className="label">ID</label>
                        <input 
                            id={this.svc + '_id'} 
                            type="text" 
                            className="input" 
                            value={this.state.id} 
                            onChange={(event) => {this.setState({...this.state, id: event.target.value}); }}
                        />
                    </div>
                    <div className="group">
                        <label htmlFor={this.svc + '_pass'} className="label">PW</label>
                        <input 
                            id={this.svc + '_pass'} 
                            type="password" 
                            className="input" 
                            data-type="password" 
                            value={this.state.pw} 
                            onChange={(event) => {this.setState({...this.state, pw: event.target.value}); }}
                        />
                    </div>
            </div>

        );
    }
}

export default SettingScm;
