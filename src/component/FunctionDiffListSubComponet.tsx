import * as React from 'react';
import { Card, Grid } from 'semantic-ui-react';
// import { Method } from './models'; 
import * as LogCollectEvents from '../events/LogCollectEvents';

interface IProps {
    method:  LogCollectEvents.IRevisionInfo;
    align: 'vertical'|'horizontal';
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
        if (this.props.align === 'horizontal') {
            return (
                <Card.Content extra={true}>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                            <Card.Meta textAlign="left">author</Card.Meta>
                            <Card.Description textAlign="left"> {method.author}</Card.Description>
                            </Grid.Column>
                            <Grid.Column>
                                <Card.Meta textAlign="left">commit</Card.Meta>
                                <Card.Description textAlign="left"> {method.name}</Card.Description>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            );
        } else {
            return (
                <Card.Content extra={true}>
                    <Card.Meta textAlign="left">author</Card.Meta>
                    <Card.Description textAlign="left"> {method.author}</Card.Description>
                    <Card.Meta textAlign="left">commit</Card.Meta>
                    <Card.Description textAlign="left"> {method.name}</Card.Description>
                </Card.Content>
            );
        }
    }
}
