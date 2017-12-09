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

    setLogState(methods: LogCollectEvents.IRevisionInfo[]) {
        console.log(methods);
        this.setState({revisions: methods});
   }
   componentWillMount() {
        LogCollectEvents.listenShowLog(this.setLogState);
   }
   componentWillUnmount() {
      // listenShowLog 제거 해야함.
   }
    
    render() {
        if (this.state.revisions.length > 0) {
            return (
                <div className="history-layer">
                    <img className="historyview-logo" src="logo2.png" />
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
