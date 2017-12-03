import * as React from 'react';
import * as UserInfoEvent from '../events/UserInfoEvents';
import { SvcKind } from '../api/UserInfo';
import SettingScm from './SettingScm';

interface SettingState {
    portNum: number;
}

class Setting extends React.Component<{}, SettingState> {
    saveEventListeners: Function[];

   constructor(props: {}) {
       super(props);
      
       this.saveEventListeners = [];
      
       this.state = {
            portNum  : UserInfoEvent.requestPortNumEvent()
        };
        
       this.addSaveEventListener = this.addSaveEventListener.bind(this);
       this.saveAndNext = this.saveAndNext.bind(this);
   }

    saveAndNext(): void {
    for (var i = 0; i < this.saveEventListeners.length; i++) { 
        var _saveEventListener = this.saveEventListeners[i];
        _saveEventListener();
     }
    UserInfoEvent.savePortNumEvent(this.state.portNum);
   }

   addSaveEventListener(saveEventListener: Function): void {
    this.saveEventListeners.push(saveEventListener);
   }

    render() {
        return (
            
            <div className="setting-layer">
                <div className="setting-wrap">
                    <div className="setting-html">
                        <div className="setting-title">
                            <span className="title">Setting</span>
                        </div>
                        <input id="tab-1" type="radio" name="tab" className="svn" defaultChecked={true}/>
                        <label htmlFor="tab-1" className="tab">SVN </label>
                        <input id="tab-2" type="radio" name="tab" className="git"/>
                        <label htmlFor="tab-2" className="tab">GIT </label>
                      
                        <div className="setting-form">
                            <SettingScm type={SvcKind.SVN} addSaveEventListener={this.addSaveEventListener}/>
                            <SettingScm type={SvcKind.GIT} addSaveEventListener={this.addSaveEventListener}/>
                        </div>

                        <div className="hr"/>
                        <div className="ft_port">
                            <div className="group">
                                <label htmlFor="portnum" className="label"/>
                                <input 
                                    id="portnum" 
                                    type="number" 
                                    className="input" 
                                    value={this.state.portNum} 
                                    onChange={(event) => {this.setState({portNum : +event.target.value}); }}
                                />
                            </div>
                        </div>
                        <div className="setting_confirm">
                            <input type="submit" className="button" value="Confirm" onClick={this.saveAndNext}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Setting;
