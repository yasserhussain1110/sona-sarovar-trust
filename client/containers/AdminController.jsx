import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminPanel from './AdminPanel';

const AdminController = ({userAuth, match}) => {
  return (!userAuth.loggedIn ? <Redirect to="/admin/login" push /> : <AdminPanel match={match} />);
};

const mapStateToProps = state => {
  return {
    userAuth: state.userAuth
  };
};

AdminController.propTypes = {
  userAuth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AdminController);
