import * as React from 'react';
import { Card, MenuItemProps } from 'semantic-ui-react';
import { Sidebar, Segment, Button, Menu, Grid } from 'semantic-ui-react';
import FunctionDiff from './FunctionDiff';
import FunctionDiffComponent from './FunctionDiffListComponet';
import FunctionDiffSubComponent from './FunctionDiffListSubComponet';
import * as LogCollectEvents from '../events/LogCollectEvents';
import { SvcKind } from '../api/UserInfo';

interface IProps {
  revisions: LogCollectEvents.IRevisionInfo[];
}

interface IState {
  visible: boolean;
  showReply: boolean;
  activeItem: number;
  methods: LogCollectEvents.IRevisionInfo[];
}

export default class FunctionDiffListSidebar extends React.Component<IProps, IState> { 
  
  constructor(props: IProps) {
      super(props);
      this.state = {
        showReply: false,
        visible: true,
        activeItem: 0,
        methods: props.revisions
      };
      
  }

  componentWillReceiveProps(props: IProps) {
    this.setState({methods: props.revisions});
  }
  
  onClick = (e: React.MouseEvent<HTMLAnchorElement> ) => { 
    this.setState({showReply: !this.state.showReply});
  }

  toggleVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ visible: !this.state.visible }); 
  }

  handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,  data: MenuItemProps ) => {
    console.log(data.index);
    this.setState({ activeItem: data.index } );
  }

  render() {
    const {revisions} = this.props;
    const {activeItem, visible , showReply} = this.state;

    return (
      <div className="histroy-contents">
        <Sidebar.Pushable as={Segment}> 
          <Sidebar as={Menu} animation="uncover" width="wide" visible={visible} icon="labeled" vertical={true} >
            <Menu fluid={true} pointing={true} secondary={true} vertical={true}>  
              {
                  revisions ?
                  revisions.map((val, index) => (
                      <Menu.Item
                        index={index}
                        key={val.name}
                        name={val.name}
                        active={activeItem === index}
                        onClick={this.handleItemClick}
                        content={
                          <div onClick={this.onClick.bind(this)}>
                            <Card>
                              <FunctionDiffComponent method={val}/>
                              { showReply && (activeItem === index) ? 
                              <FunctionDiffSubComponent method={val} /> : null}
                            </Card>
                          </div>}
                      />
                    ))
                    : null
              }
            </Menu>
          </Sidebar>
            <Sidebar.Pusher>
              <Segment basic={true}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                        <Button 
                          onClick={this.toggleVisibility} 
                          circular={true} 
                          icon={visible ? 'chevron left' : 'chevron right'}
                        />
                        <Button circular={true} icon="settings" />
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column width={15}>
                      <FunctionDiff 
                        diffString={revisions[activeItem].diff}
                        scmType={SvcKind.GIT} 
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid> 
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
    );
  }
}
