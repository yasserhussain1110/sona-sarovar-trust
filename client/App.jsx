import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import handleCommonErrors, {logOut} from './lib/handlers/commonErrorsHandler';
import Web from './routes/Web';
import Admin from './routes/Admin';
import * as actions from './actions';
import ScrollToTop from './lib/components/ScrollToTop';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.init();
  }

  initializeAuth() {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      /**
       * If authToken is present assume the admin is logged in.
       * We do this because the verification that the user is
       * logged in happens asynchronously so there is a short
       * duration where app is in not logged in state, so
       * urls like 'http://localhost:8080/admin/home' will be
       * redirected to 'http://localhost:8080/admin/login' and
       * soon after the login is complete is redirected again to
       * the specified page. This leads to a bad UX.
       *
       * In this method we assume the user is logged in if auth-
       * Token is present and then try to verify it. If the user
       * is actually not logged in, we log them out.
       */
      this.props.logIn(authToken);
      axios.get('/api/admin/isLoggedIn', {headers: {'x-auth': authToken}})
        .catch(e => {
          logOut();
          console.log(e, 'Not logged In');
        });
    }
  }

  initializeApp() {
    axios.get('/api/init-state')
      .then(response => {
        const {
          homePage, aboutUs,
          projects, activities,
          teamMembers, testimonials, awards
        } = response.data;
        this.props.receivedHomePageContent(homePage);
        this.props.receivedAboutUs(aboutUs);
        this.props.receivedTeamMembers(teamMembers);
        this.props.receivedActivitiesUndertaken(activities);
        this.props.receivedProjectsDone(projects);
        this.props.receivedTestimonials(testimonials);
        this.props.receivedAwards(awards);
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

  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <main>
            <Route path="/web" component={Web} />
            <Route path="/admin" component={Admin} />
            <Route exact path="/" render={() => <Redirect to="/web" />} />
          </main>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  logIn: PropTypes.func.isRequired,
  receivedHomePageContent: PropTypes.func.isRequired,
  receivedTeamMembers: PropTypes.func.isRequired,
  receivedActivitiesUndertaken: PropTypes.func.isRequired,
  receivedProjectsDone: PropTypes.func.isRequired,
  receivedAboutUs: PropTypes.func.isRequired,
  receivedTestimonials: PropTypes.func.isRequired
};

const mapDispatchToProps = actions;

export default connect(null, mapDispatchToProps)(App);
