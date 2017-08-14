import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from '../containers/Home';
import About from '../containers/About';
import Header from '../containers/Header';
import Projects from '../containers/Projects';
import Activities from '../containers/Activities';
import ProjectHolder from '../containers/ProjectHolder';

export default ({match}) => (
  <BrowserRouter>
    <main id="web">
      <Header match={match}/>
      <Route exact path={`${match.url}`} component={Home}/>
      <Route path={`${match.url}/about`} component={About}/>
      <Route exact path={`${match.url}/projects`} component={Projects}/>
      <Route path={`${match.url}/projects/:index`} component={ProjectHolder}/>
      <Route path={`${match.url}/activities`} component={Activities}/>
    </main>
  </BrowserRouter>
);
