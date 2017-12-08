import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, MenuItemProps } from 'semantic-ui-react';
import { Sidebar, Segment, Button, Menu } from 'semantic-ui-react';
import FunctionDiff from './FunctionDiff';
import { Method } from './models'; 
import FunctionDiffComponent from './FunctionDiffListComponet';
import FunctionDiffSubComponent from './FunctionDiffListSubComponet';

interface IProps extends RouteComponentProps<{funcName: string}> {
  methods: Method[];
}

interface IState {
  visible: boolean;
  showReply: boolean;
  activeItem: string;
  methods: Method[];
}

export default class FunctionDiffListSidebar extends React.Component<IProps, IState> { 
  
  constructor(props: IProps) {
      super(props);
      this.state = {
        showReply: false,
        visible: true,
        activeItem: 'promotions',
        methods: props.methods,
      };
  }

  componentWillReceiveProps(props: IProps) {
    this.setState({methods: props.methods});
  }
  
  onClick = (e: React.MouseEvent<HTMLAnchorElement> ) => { 
    this.setState({showReply: !this.state.showReply});
  }

  toggleVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ visible: !this.state.visible }); 
  }

  handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,  data: MenuItemProps ) => 
    this.setState({ activeItem: data.name } )

  render() {
    const {match, location, history, staticContext, methods, ...rest} = this.props;
    const {activeItem, visible , showReply} = this.state;

    return (
      <div className="histroy-contents">
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment}> 
          <Sidebar as={Menu} animation="uncover" width="wide" visible={visible} icon="labeled" vertical={true} >
            <Menu fluid={true} pointing={true} secondary={true} vertical={true}>  
                  {
                    methods ?
                      methods.map((val: Method) => (
                          <Menu.Item
                            key={val.name}
                            name={val.name}
                            active={activeItem === val.name}
                            onClick={this.handleItemClick}
                            content={
                              <div onClick={this.onClick.bind(this)}>
                                <Card>
                                  <FunctionDiffComponent method={val}/>
                                  { showReply && (activeItem === val.name) ? 
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
                <FunctionDiff {...rest} />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
    );
  }
}
