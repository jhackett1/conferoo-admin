import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from 'react-router-dom';
import UserService from './UserService';

import Header from './partials/Header.react';
import Footer from './partials/Footer.react';
import Login from './login/Login.react';
import LoginCallback from './login/LoginCallback.react';
import Dashboard from './dashboard/Dashboard.react';
import About from './about/About.react';
import PostList from './posts/PostList.react';
import PostNew from './posts/PostNew.react';
import PostEdit from './posts/PostEdit.react';

import EventList from './events/EventList.react';
import EventNew from './events/EventNew.react';
import EventEdit from './events/EventEdit.react';

import PollList from './polls/PollList.react';
import PollNew from './polls/PollNew.react';
import PollEdit from './polls/PollEdit.react';

import SpeakerList from './speakers/SpeakerList.react';
import SpeakerNew from './speakers/SpeakerNew.react';
import SpeakerEdit from './speakers/SpeakerEdit.react';

import MediaList from './media/MediaList.react';

import UserList from './users/UserList.react';

class App extends Component {
  render() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        UserService.checkToken() ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    );

    return (
      <Router>
        <div>
          <Header />

          <PrivateRoute exact path="/" component={Dashboard}/>

          <Switch>
            <Route path="/login/callback" component={LoginCallback}/>
            <Route path="/login" component={Login}/>
          </Switch>

          <Switch>
            <PrivateRoute path="/polls/new" component={PollNew}/>
            <PrivateRoute path="/polls/edit/:id" component={PollEdit}/>
            <PrivateRoute path="/polls" component={PollList}/>
          </Switch>

          <Switch>
            <PrivateRoute path="/events/edit/:id" component={EventEdit}/>
            <PrivateRoute path="/events/new" component={EventNew}/>
            <PrivateRoute path="/events" component={EventList}/>
          </Switch>

          <Switch>
            <PrivateRoute path="/speakers/edit/:id" component={SpeakerEdit}/>
            <PrivateRoute path="/speakers/new" component={SpeakerNew}/>
            <PrivateRoute path="/speakers" component={SpeakerList}/>
          </Switch>

          <Switch>
            <PrivateRoute path="/posts/edit/:id" component={PostEdit}/>
            <PrivateRoute path="/posts/new" component={PostNew}/>
            <PrivateRoute path="/posts" component={PostList}/>
          </Switch>

          <Switch>
            <PrivateRoute path="/media" component={MediaList}/>
          </Switch>

          <Switch>
            <PrivateRoute path="/users" component={UserList}/>
          </Switch>

          <Route path="/about" component={About}/>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
