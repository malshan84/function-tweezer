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
        LogCollectEvents.listenShowLog(this.setLogState);
        this.state = {
           revisions: []
        };
        
    }

    setLogState(revisions: LogCollectEvents.IRevisionInfo[]) {
        this.setState({revisions: revisions});
        
   }
    
    render() {
        if (this.state.revisions.length > 0) {
            return (
                <div className="history-layer">
                    <FunctionDiffContainer revisions={...this.state.revisions}/>
                </div>
            );
         
         } 

        return (
            <Waiting />
         );
    }
}

export default FunctionHistoryView;
