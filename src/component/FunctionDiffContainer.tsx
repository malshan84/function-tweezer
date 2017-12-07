import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Menu, List, MenuItemProps } from 'semantic-ui-react';
import FunctionDiff from './FunctionDiff';
import { Method } from './models'; 
import FunctionDiffComponent from './FunctionDiffListComponet';
import FunctionDiffSubComponent from './FunctionDiffListSubComponet';

interface IProps extends RouteComponentProps<{funcName: string}> {
  methods: Method[];
}

interface IState {
  activeItem: string;
  methods: Method[];
}

export default class FunctionDiffContainer extends React.Component<IProps, IState> { 
  
  constructor(props: IProps) {
      super(props);
      this.state = {
        activeItem: 'promotions',
        methods: props.methods,
      };
  }

  componentWillReceiveProps(props: IProps) {
    this.setState({methods: props.methods});
  }

  handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,  data: MenuItemProps ) => 
    this.setState({ activeItem: data.name } )

  render() {
    const {match, location, history, staticContext, methods, ...rest} = this.props;
    const {activeItem} = this.state;

    return (
      <Grid>
        <Grid.Column width={3}>
          <Menu fluid={true} vertical={true} tabular={true}>
            {
              methods ?
                methods.map((val: Method) => (
                    <Menu.Item
                      key={val.name}
                      name={val.name}
                      active={activeItem === val.name}
                      onClick={this.handleItemClick}
                      content={
                        <div>
                          <List>
                            <List.Item>
                              <FunctionDiffComponent method={val} activeItem={activeItem} />
                            </List.Item>
                            <List.Item>
                              <FunctionDiffSubComponent method={val} activeItem={activeItem} />
                            </List.Item>
                          </List>
                        </div>
                        
                      }
                    />
                  ))
                  : null
            }
          </Menu>
        </Grid.Column>

        <Grid.Column stretched={true} width={12}>
          <FunctionDiff {...rest} />
        </Grid.Column>
      </Grid>
    );
  }
}
