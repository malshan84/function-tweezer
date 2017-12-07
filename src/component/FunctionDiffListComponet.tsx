import * as React from 'react'
import { List, Card } from 'semantic-ui-react'
import { Method } from './models'; 

interface IProps 
{
    activeItem:string;
    method: Method;
}

interface IState {
    activeItem: string;
    method: Method;
}

export default class ListExampleTree extends React.Component<IProps, IState> {     
    
    constructor(props: IProps){
        super(props);
        this.state = { 
            activeItem: props.activeItem,
            method: props.method,
        };
    }

    render() {
        const { method ,activeItem, ...rest } = this.props;
    
        return (
            <List>
                <List.Item>
                <List.Content>
                    <List.Header><Card header={method.name} description={method.comment} color={activeItem === method.name ? 'purple' : null}/></List.Header>
                    <List.List>
                    <List.Item>
                        <List.Content>
                        <List.Header>site</List.Header>
                        <List.Description>Your site's theme</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                        <List.Header>themes</List.Header>
                        <List.Description>Packaged theme files</List.Description>
                        </List.Content>
                    </List.Item>
                    </List.List>
                </List.Content>
                </List.Item>
            </List>
        )
    }
}
