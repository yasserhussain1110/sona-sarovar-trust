import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.userAuth.loggedIn) {
      return <Redirect to="/admin/auth" push/>
    }
    return <div>Admin Panel </div>;
  }
}

const mapStateToProps = state => {
  return {
    userAuth: state.userAuth
  }
};

export default connect(mapStateToProps)(Admin);
