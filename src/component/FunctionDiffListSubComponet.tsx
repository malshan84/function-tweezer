import * as React from 'react';
import { List } from 'semantic-ui-react';
import { Method } from './models'; 

interface IProps {
    activeItem: string;
    method: Method;
}

interface IState {
    activeItem: string;
    method: Method;
}

export default class FunctionDiffSubComponent extends React.Component<IProps, IState> {     
    
    constructor(props: IProps) {
        super(props);
        this.state = { 
            activeItem: props.activeItem,
            method: props.method,
        };
    }

    render() {
        const { method , activeItem, ...rest } = this.props;
    
        return (
            <List.List>
                <List.Item>
                    <List.Content
                        header={method.name} 
                        description={method.comment} 
                    />
                </List.Item>
            </List.List>                            
        );
    }
}
