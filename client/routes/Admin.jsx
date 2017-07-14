import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AdminPanel from '../containers/AdminPanel';
import AdminAuth from '../containers/AdminAuth';
import {connect} from 'react-redux';
import {logIn} from '../actions';

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let authToken = localStorage.getItem('auth-token');
    if (authToken) {
      this.props.logIn(authToken);
    }
  }

  render() {
    let {match} = this.props;

    return (
      <BrowserRouter>
        <main>
          <Route exact path={`${match.url}`} component={AdminPanel}/>
          <Route path={`${match.url}/auth`} component={AdminAuth}/>
        </main>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logIn: authToken => {
      dispatch(logIn(authToken))
    }
  };
};

export default connect(null, mapDispatchToProps)(Admin);
