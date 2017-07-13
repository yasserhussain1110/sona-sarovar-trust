import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from '../containers/Home';
import About from '../containers/About';
import Header from '../containers/Header';
import Projects from '../containers/Projects';
import Activities from '../containers/Activities';

export default ({match}) => (
  <BrowserRouter>
    <main>
      <Header match={match}/>
      <Route exact path={`${match.url}`} component={Home}/>
      <Route path={`${match.url}/about`} component={About}/>
      <Route path={`${match.url}/projects`} component={Projects}/>
      <Route path={`${match.url}/activities`} component={Activities}/>
    </main>
  </BrowserRouter>
);
