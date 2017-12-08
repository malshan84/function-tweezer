import * as React from 'react';
import { Card } from 'semantic-ui-react';
import { Method } from './models'; 

interface IProps {
    method: Method;
}

interface IState {
    method: Method;
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
                <Card.Description> {method.code}</Card.Description>
            </Card.Content>
        );
    }
}
