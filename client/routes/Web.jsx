import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Web/Header';
import Home from '../containers/Home';
import History from '../containers/History';
import VisionAndMission from '../containers/VisionAndMission';
import Testimonials from '../containers/Testimonials';
import OurAwards from '../containers/OurAwards';
import Team from '../containers/Team';
import Trustees from '../components/Team/Trustees';
import BrandAmbassador from '../components/Team/BrandAmbassador';
import TechnicalTeam from '../components/Team/TechnicalTeam';
import Volunteers from '../components/Team/Volunteers';
import Projects from '../containers/Projects';
import ProjectHolder from '../containers/ProjectHolder';
import Activities from '../containers/Activities';
import ActivityHolder from '../containers/ActivityHolder';
import Donate from '../containers/Donate';
import DonateOnline from '../components/Donate/DonateOnline';
import DonateDone from '../components/Donate/DonateDone';
import DonateOffline from '../components/Donate/DonateOffline';
import Volunteer from '../containers/Volunteer';
import Contact from '../containers/Contact';
import Footer from '../components/Web/Footer';

const Web = ({match}) => (
  <main id="web">
    <Header match={match} />
    <Route exact path={`${match.url}`} component={Home} />
    <Route path={`${match.url}/about/history`} component={History} />
    <Route path={`${match.url}/about/vision`} component={VisionAndMission} />
    <Route path={`${match.url}/about/testimonials`} component={Testimonials} />
    <Route path={`${match.url}/about/awards`} component={OurAwards} />
    <Route exact path={`${match.url}/about/team`} component={Team} />
    <Route path={`${match.url}/about/team/trustees`} component={Trustees} />
    <Route path={`${match.url}/about/team/brand-ambassador`} component={BrandAmbassador} />
    <Route path={`${match.url}/about/team/technical-team`} component={TechnicalTeam} />
    <Route path={`${match.url}/about/team/volunteers`} component={Volunteers} />
    <Route exact path={`${match.url}/projects`} component={Projects} />
    <Route path={`${match.url}/projects/:index`} component={ProjectHolder} />
    <Route exact path={`${match.url}/activities`} component={Activities} />
    <Route path={`${match.url}/activities/:index`} component={ActivityHolder} />
    <Route exact path={`${match.url}/involve/donate`} component={Donate} />
    <Route path={`${match.url}/involve/donate/online`} component={DonateOnline} />
    <Route path={`${match.url}/involve/donate/online/done`} component={DonateDone} />
    <Route path={`${match.url}/involve/donate/offline`} component={DonateOffline} />
    <Route path={`${match.url}/involve/volunteer`} component={Volunteer} />
    <Route path={`${match.url}/contact`} component={Contact} />
    <Footer />
  </main>
);

Web.propTypes = {
  match: PropTypes.object.isRequired
};

export default Web;
