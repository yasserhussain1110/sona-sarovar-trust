import React, {Component} from 'react';
import {logIn, logOff} from './actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    userAuth: state.userAuth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: authToken => {
      dispatch(logIn(authToken))
    },

    logOff: () => {
      dispatch(logOff())
    }
  };
};

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log(this.props);
    return <div>Admin Panel <div> {this.props.userAuth.authToken} </div></div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
