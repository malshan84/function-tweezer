import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react'
import FunctionDiff from './FunctionDiff';
import { Method } from './models'; 
import ListExampleTree from './FunctionDiffListComponet'

interface IProps extends RouteComponentProps<{funcName: string}> {
  methods: Method[];
}

interface IState {
  activeItem: string;
  methods: Method[];
}

export default class FunctionDiffContainer extends React.Component<IProps, IState> { 
  
  constructor(props: IProps){
      super(props);
      this.state = {
        activeItem: "promotions",
        methods: props.methods,
      };
  }

  componentWillReceiveProps(props: IProps) {
    this.setState({methods: props.methods});
  }

  handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, { name }) => this.setState({ activeItem: name })

  render() {
    const {match, location, history, staticContext, methods, ...rest} = this.props;
    const {activeItem} = this.state;

    return (
      <Grid>
        <Grid.Column width={3}>
          <Menu fluid vertical tabular>
            {
              methods ?
                methods.map((val: Method) => (
                    <Menu.Item
                      key={val.name}
                      name={val.name}
                      active={activeItem === val.name}
                      onClick={this.handleItemClick}
                      content={
                        //<Card header={val.name} description={val.comment} color={activeItem === val.name ? 'purple' : null}/>
                        <ListExampleTree method = {val} activeItem={activeItem} /> 
                      }
                    />
                  ))
                  : null
            }
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <FunctionDiff {...rest} />
        </Grid.Column>
      </Grid>
    )
  }
}
