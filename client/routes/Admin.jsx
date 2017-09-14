import React from 'react';
import {Route} from 'react-router-dom';
import AdminController from '../containers/AdminController';
import LoginController from '../containers/LoginController';

const Admin = ({match}) => (
  <main id="admin">
    <Route path={`${match.url}`} component={AdminController}/>
    <Route path={`${match.url}/login`} component={LoginController}/>
  </main>
);

export default Admin;
