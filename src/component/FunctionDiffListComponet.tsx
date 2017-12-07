import * as React from 'react';
import { List, Card } from 'semantic-ui-react';
import { Method } from './models'; 

interface IProps {
    activeItem: string;
    method: Method;
}

interface IState {
    activeItem: string;
    method: Method;
}

export default class FunctionDiffComponent extends React.Component<IProps, IState> {     
    
    constructor(props: IProps) {
        super(props);
        this.state = { 
            activeItem: props.activeItem,
            method: props.method,
        };
    }

    render() {
        const { method , activeItem } = this.props;
    
        return (
            <List.Content>
                <Card 
                    header={method.name} 
                    description={method.comment} 
                    color={activeItem === method.name ? 'purple' : null}
                />
            </List.Content>
        );
    }
}
