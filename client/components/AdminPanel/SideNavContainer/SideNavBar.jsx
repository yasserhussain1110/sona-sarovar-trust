import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

const SideNavBar = ({children, location}) => (
  <div className="side-nav-bar">
    <h4>Admin Panel Navigation</h4>
    <ul className="side-nav-list">{
      React.Children.map(children, child =>
        React.cloneElement(child, {pathname: location.pathname}))}
    </ul>
  </div>
);

SideNavBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(SideNavBar);
