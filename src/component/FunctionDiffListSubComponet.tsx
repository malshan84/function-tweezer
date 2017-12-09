import * as React from 'react';
import { Card } from 'semantic-ui-react';
// import { Method } from './models'; 
import * as LogCollectEvents from '../events/LogCollectEvents';

interface IProps {
    method:  LogCollectEvents.IRevisionInfo;
}

interface IState {
    method:  LogCollectEvents.IRevisionInfo;
}
export default class FunctionDiffSubComponent extends React.Component<IProps, IState> {     
    
    constructor(props: IProps) {
        super(props);
        this.state = { 
            method: props.method,
        };
    }

    render() {
        const { method } = this.props;
    
        return (
            <Card.Content extra={true}>
                <Card.Description> {method.message}</Card.Description>
            </Card.Content>
        );
    }
}
