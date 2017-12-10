import * as React from 'react';
import * as LogCollectEvents from '../events/LogCollectEvents';
import Waiting from './Waiting';
import FunctionDiffContainer from './FunctionDiffContainer';

interface IState {
    revisions: LogCollectEvents.IRevisionInfo[];
}

class FunctionHistoryView extends React.Component<{}, IState > {
    
   constructor(props: IState) {
        super(props);
        this.setLogState = this.setLogState.bind(this);
        this.state = {
           revisions: []
        };
        
    }

   setLogState(methods: LogCollectEvents.IRevisionInfo[]) {
        this.setState({revisions: methods});
   }
   componentWillMount() {
        LogCollectEvents.listenShowLog(this.setLogState);
   }
   componentWillUnmount() {
       LogCollectEvents.removeListenerShowLog();
   }
    
   render() {
        if (this.state.revisions.length > 0) {
            return (
                <div className="history-layer">
                    <img className="historyview-logo" src="logo_black.png" />
                    <FunctionDiffContainer methods={...this.state.revisions}/>
                </div>
            );
         } 
        return (
            <Waiting />
         );
    }
}

export default FunctionHistoryView;
