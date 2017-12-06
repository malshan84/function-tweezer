import * as React from 'react';
import ToolBar from './ToolBar';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import Waiting from './Waiting';
import FunctionDiff from './FunctionDiff';
class FunctionHistoryView extends React.Component<RouteComponentProps<{}>, {} > {
 
    render() {
        return (
            <div className="history-layer">
                <ToolBar />
                <div className="histroy-contents">
                    <Switch>
                        <Route exact={true} path={`${this.props.match.url}/:funcName`} component={FunctionDiff}/>
                        <Route exact={true} path={this.props.match.url}  component={Waiting}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default FunctionHistoryView;
