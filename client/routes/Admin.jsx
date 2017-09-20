import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AdminController from '../containers/AdminController';
import LoginController from '../containers/LoginController';

const Admin = ({match}) => (
  <main id="admin">
    <Switch>
      <Route path={`${match.url}/login`} component={LoginController}/>
      <Route path={`${match.url}`} component={AdminController}/>
    </Switch>
  </main>
);

export default Admin;
