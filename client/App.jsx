import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import handleCommonErrors from './lib/handlers/commonErrorsHandler';

import Web from './routes/Web';
import Admin from './routes/Admin';
import * as actions from './actions';
import {connect} from 'react-redux';
import 'typeface-kelly-slab';

class App extends Component {
  constructor(props) {
    super(props);
  }

  initializeAuth() {
    let authToken = localStorage.getItem('auth-token');
    if (authToken) {
      this.props.logIn(authToken);
    }
  }

  initializeApp() {
    axios.get('/api/init-state')
      .then(response => {
        let {homePage, projects, activities, teamMembers} = response.data;

        this.props.receivedHomePageContent(homePage);
        this.props.receivedTeamMembers(teamMembers);
        this.props.receivedActivitiesUndertaken(activities);
        this.props.receivedProjectsDone(projects);
      })
      .catch(error => {
        handleCommonErrors(error);
        console.log(error);
      });
  }

  init() {
    this.initializeAuth();
    this.initializeApp();
  }

  componentWillMount() {
    this.init();
  }

  render() {
    return (
      <BrowserRouter>
        <main>
          <Route path="/web" component={Web}/>
          <Route path="/admin" component={Admin}/>
          <Route exact path="/" render={() => <Redirect to="/web"/>}/>
        </main>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = actions;

export default connect(null, mapDispatchToProps)(App);
