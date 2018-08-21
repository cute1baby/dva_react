import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './components/Layout/IndexPage';
import Info from './routes/Info';

/* class RootSub extends Component {
  render(){
    return (
      <IndexPage>
        <Switch>
          <Route exact={true} path="/" component={Info} />
          <Route exact={true} path="/info" component={Info} />
        </Switch>
      </IndexPage>
    )
  }
} */
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <IndexPage>
        <Switch>
          <Route path="/" exact component={Info} />
          <Route exact={true} path="/info" component={Info} />
        </Switch>
      </IndexPage>
    </Router>
  );
}

export default RouterConfig;
