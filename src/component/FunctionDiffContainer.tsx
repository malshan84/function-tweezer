import * as React from 'react';
import { Card, MenuItemProps } from 'semantic-ui-react';
import { Sidebar, Segment, Button, Menu } from 'semantic-ui-react';
import FunctionDiff from './FunctionDiff';
import FunctionDiffComponent from './FunctionDiffListComponet';
import FunctionDiffSubComponent from './FunctionDiffListSubComponet';
import * as LogCollectEvents from '../events/LogCollectEvents';
import { SvcKind } from '../api/UserInfo';

interface IProps {
  methods: LogCollectEvents.IRevisionInfo[];
}

interface IState {
  visible: boolean;
  activeItem: number;
  sideByside: boolean;
  methods: LogCollectEvents.IRevisionInfo[];
}

export default class FunctionDiffListSidebar extends React.Component<IProps, IState> { 
  
  constructor(props: IProps) {
      super(props);
      this.state = {
        visible: true,
        activeItem: 0,
        sideByside: false,
        methods: props.methods
      };
      
  }

  componentWillReceiveProps(props: IProps) {
    this.setState({methods: props.methods});
  }

  toggleVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ visible: !this.state.visible }); 
  }

  changeDiffOutFormat = () => {
    this.setState({ sideByside: !this.state.sideByside }); 
  }

  moveSettingPage = () => {
    window.location.hash = '/setting';
  }

  changeLog = (change: 'prev'| 'next') => {
    if (change === 'prev') {
      this.setState({ activeItem: this.state.activeItem - 1 } );
    } else if (change === 'next') {
      this.setState({ activeItem: this.state.activeItem + 1 } );
    }
  }

  handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,  data: MenuItemProps ) => {
    this.setState({ activeItem: data.index } );
  }

  render() {
    const {methods} = this.props;
    const {activeItem, visible, sideByside} = this.state;

    return (
      <div className="history-contents">
        <Sidebar.Pushable as={Segment}> 
          <Sidebar as={Menu} animation="uncover" width="wide" visible={visible} icon="labeled" vertical={true} >
            <Menu fluid={true} pointing={true} secondary={true} vertical={true}>  
              {
                  methods ?
                  methods.map((val, index) => (
                      <Menu.Item
                        index={index}
                        key={val.name}
                        name={val.name}
                        active={activeItem === index}
                        onClick={this.handleItemClick}
                        content={
                          <div>
                            <Card>
                              <FunctionDiffComponent method={val}/>
                              { (activeItem === index) ? 
                              <FunctionDiffSubComponent method={val} align="vertical" /> : null}
                            </Card>
                          </div>}
                      />
                    ))
                    : null
              }
            </Menu>
          </Sidebar>
            <Sidebar.Pusher className={visible ? 'left' : 'right'}>
              <Segment basic={true}>
                 <Card className="history-detail">
                      {(activeItem !== 0) ?
                          <div 
                            className="swiper-button-prev swiper-button-white" 
                            onClick={(event) => this.changeLog('prev')}
                          />
                        : null
                      }

                      {(activeItem !== (methods.length - 1)) ?
                        <div 
                          className="swiper-button-next swiper-button-white"  
                          onClick={(evnet) => this.changeLog('next')}
                        />
                      : null
                      }
                      <FunctionDiffComponent method={methods[activeItem]}/>
                      <FunctionDiffSubComponent method={methods[activeItem]} align="horizontal" /> 
                  </Card>
                  <FunctionDiff 
                    diffString={methods[activeItem].diff}
                    scmType={SvcKind.GIT}
                    sideBySide={sideByside}
                  />
                  <div className="history-menu">
                    <div className="menu-hr"/>
                    <Button 
                      onClick={this.toggleVisibility} 
                      circular={true} 
                      icon={visible ? 'chevron left' : 'chevron right'}
                    />
                    <Button circular={true} icon="settings" onClick={this.moveSettingPage}/>
                    <Button circular={true} icon="columns" primary={sideByside} onClick={this.changeDiffOutFormat}/>
                  </div>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
    );
  }
}
