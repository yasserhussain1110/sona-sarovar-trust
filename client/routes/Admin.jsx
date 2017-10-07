import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import AdminController from '../containers/AdminController';
import LoginController from '../containers/LoginController';

const Admin = ({match}) => (
  <main id="admin">
    <Switch>
      <Route path={`${match.url}/login`} component={LoginController} />
      <Route path={`${match.url}`} component={AdminController} />
    </Switch>
  </main>
);

Admin.propTypes = {
  match: PropTypes.object.isRequired
};


export default Admin;
