import * as React from 'react';
import ToolBar from './ToolBar';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import Waiting from './Waiting';
import FunctionDiff from './FunctionDiff';
class FunctionHistoryView extends React.Component<RouteComponentProps<{}>, {} > {
 
    render() {
        return (
        <div className="wait-layer">
            <ToolBar />
            <Switch>
                <Route exact={true} path={`${this.props.match.url}/:funcName`} component={FunctionDiff}/>
                <Route exact={true} path={this.props.match.url}  component={Waiting}/>
            </Switch>
        </div>
        );
    }
}

export default FunctionHistoryView;
