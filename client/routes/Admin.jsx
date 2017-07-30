import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AdminController from '../containers/AdminController';
import AdminAuth from '../containers/AdminAuth';

const Admin = ({match}) => (
  <BrowserRouter>
    <main id="admin">
      {/* Might need to remove exact keyword from here */}
      <Route exact path={`${match.url}`} component={AdminController}/>
      <Route path={`${match.url}/auth`} component={AdminAuth}/>
    </main>
  </BrowserRouter>
);

export default Admin;
