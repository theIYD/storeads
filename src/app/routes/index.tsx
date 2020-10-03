import React from 'react';
import { createBrowserHistory, History } from 'history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from '../containers/login';
import SignUp from '../containers/signup';

const history: History = createBrowserHistory();

const RoutesContainer: React.FC = () => {
  let loggedIn: boolean = !!sessionStorage.getItem('accessToken');
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
};

export default RoutesContainer;
