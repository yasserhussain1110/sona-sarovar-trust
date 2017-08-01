import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import AdminPanel from './AdminPanel';

const AdminController = ({userAuth, match}) => {
  return (!userAuth.loggedIn ? <Redirect to="/admin/auth" push/> : <AdminPanel match={match}/>);
};

const mapStateToProps = state => {
  return {
    userAuth: state.userAuth
  }
};

export default connect(mapStateToProps)(AdminController);
