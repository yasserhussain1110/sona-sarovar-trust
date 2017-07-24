import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const AdminPanelScreen = (
  //<button type="button" className="btn btn-primary">Primary</button>
  <div>AdminPanel</div>
);

const AdminPanel = ({userAuth}) => (!userAuth.loggedIn ? <Redirect to="/admin/auth" push/> : AdminPanelScreen);

const mapStateToProps = state => {
  return {
    userAuth: state.userAuth
  }
};

export default connect(mapStateToProps)(AdminPanel);
