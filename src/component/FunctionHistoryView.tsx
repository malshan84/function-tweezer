import * as React from 'react';
import ToolBar from './ToolBar';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
// import Waiting from './Waiting';
import FunctionDiff from './FunctionDiffContainer';
class FunctionHistoryView extends React.Component<RouteComponentProps<{}>, {} > {
 
    render() {
        return (
            <div className="history-layer">
                <ToolBar />
                <div className="histroy-contents">
                    <Switch>
                        {/* <Route exact={true} path={`${this.props.match.url}/:funcName`} 
                            component={FunctionDiff}/> */}
                        <Route 
                            exact={true} 
                            path={this.props.match.url}
                            // component={FunctionDiff}
                            render={
                                // tslint:disable-next-line:jsx-alignment
                                (props) => <FunctionDiff {...props} methods={[
                                    { name: 'test()', comment: 'this is dummy...', code: 'void test() {}' },
                                    { name: 'test2()', comment: 'this is dummy...', code: 'void test2() {}' }]}
                                />} 
                        />
                        {/*<Route exact={true} path={this.props.match.url}  component={Waiting}/>*/}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default FunctionHistoryView;
