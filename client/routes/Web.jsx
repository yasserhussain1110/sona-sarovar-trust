import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../containers/Home';
import About from '../containers/About';
import Header from '../containers/Header';
import Projects from '../containers/Projects';
import ProjectHolder from '../containers/ProjectHolder';
import Activities from '../containers/Activities';
import ActivityHolder from '../containers/ActivityHolder';
import DonationBox from '../containers/DonationBox';
import DonationDoneBox from '../containers/DonationDoneBox';

const Web = ({match}) => (
  <main id="web">
    <Header match={match} />
    <Route exact path={`${match.url}`} component={Home} />
    <Route path={`${match.url}/about`} component={About} />
    <Route exact path={`${match.url}/projects`} component={Projects} />
    <Route path={`${match.url}/projects/:index`} component={ProjectHolder} />
    <Route exact path={`${match.url}/activities`} component={Activities} />
    <Route path={`${match.url}/activities/:index`} component={ActivityHolder} />
    <Route path={`${match.url}/donate`} component={DonationBox} />
    <Route path={`${match.url}/donate/done`} component={DonationDoneBox} />
  </main>
);

Web.propTypes = {
  match: PropTypes.object.isRequired
};

export default Web;
