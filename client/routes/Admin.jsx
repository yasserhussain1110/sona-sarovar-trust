import React from 'react';
import {Route} from 'react-router-dom';
import AdminController from '../containers/AdminController';
import AdminAuth from '../containers/AdminAuth';

const Admin = ({match}) => (
  <main id="admin">
    <Route path={`${match.url}`} component={AdminController}/>
    <Route path={`${match.url}/auth`} component={AdminAuth}/>
  </main>
);

export default Admin;
