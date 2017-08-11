import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

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
    axios.get('/init-state')
      .then(response => {
        let {homePage, projects, teamMembers} = response.data;
        let {captions, centerPics, mainTextPara1, mainTextPara2} = homePage;

        this.props.receivedCenterPicCaptions(captions);
        this.props.receivedCenterPics(centerPics);
        this.props.receivedMainTexts(mainTextPara1, mainTextPara2);
        this.props.receivedTeamMembers(teamMembers);
        this.props.receivedProjectsDone(projects);
      })
      .catch(error => {
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
