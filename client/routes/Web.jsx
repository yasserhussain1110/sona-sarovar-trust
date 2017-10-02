import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../containers/Home';
import History from '../containers/History';
import VisionAndMission from '../containers/VisionAndMission';
import Team from '../containers/Team';
import Header from '../components/Web/Header';
import Footer from '../components/Web/Footer';
import Projects from '../containers/Projects';
import ProjectHolder from '../containers/ProjectHolder';
import Activities from '../containers/Activities';
import ActivityHolder from '../containers/ActivityHolder';
import DonationBox from '../containers/DonationBox';
import DonationDoneBox from '../containers/DonationDoneBox';

export default ({match}) => (
  <main id="web">
    <Header match={match}/>
    <Route exact path={`${match.url}`} component={Home}/>
    <Route path={`${match.url}/about/history`} component={History}/>
    <Route path={`${match.url}/about/vision`} component={VisionAndMission}/>
    <Route path={`${match.url}/about/team`} component={Team}/>
    <Route exact path={`${match.url}/projects`} component={Projects}/>
    <Route path={`${match.url}/projects/:index`} component={ProjectHolder}/>
    <Route exact path={`${match.url}/activities`} component={Activities}/>
    <Route path={`${match.url}/activities/:index`} component={ActivityHolder}/>
    <Route path={`${match.url}/donate`} component={DonationBox}/>
    <Route path={`${match.url}/donate/done`} component={DonationDoneBox}/>
    <Footer/>
  </main>
);
