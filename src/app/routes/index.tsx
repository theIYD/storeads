import React from 'react';
import { createBrowserHistory, History } from 'history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Nav from '../components/Nav';
import Login from '../containers/login';
import SignUp from '../containers/signup';
import Dashboard from '../containers/dashboard';

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
        <PrivateRoute isAuthenticated={loggedIn}>
          <Route exact path="/dashboard">
            <Nav />
            <Dashboard />
          </Route>
          <Route exact path="/dashboard/create">
            <Nav />
            {/* <CreateStory /> */}
          </Route>
          <Route exact path="/dashboard/story/:storyId">
            <Nav />
            {/* <Story /> */}
          </Route>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

interface Auth {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<Auth> = (props) => {
  return (
    <Route
      render={({ location }) =>
        props.isAuthenticated ? (
          <Switch>{props.children}</Switch>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

export default RoutesContainer;
