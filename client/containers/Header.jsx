import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Header = ({match, brandLogoUrl}) => (
  <div className="header">
    <div className="logo">
      <img alt="" src={brandLogoUrl} />
    </div>

    <div className="nav">
      <ul className="nav-bar">
        <li className="list-item"><NavLink exact to={`${match.url}`} activeClassName="active">Home</NavLink></li>
        <li className="list-item"><NavLink to={`${match.url}/about`} activeClassName="active">About Us</NavLink></li>
        <li className="list-item"><NavLink to={`${match.url}/projects`} activeClassName="active">Projects</NavLink></li>
        <li className="list-item"><NavLink to={`${match.url}/activities`} activeClassName="active">Activities</NavLink></li>
        <li className="list-item"><NavLink to={`${match.url}/involve`} activeClassName="active">Get Involved</NavLink></li>
        <li className="list-item"><NavLink to={`${match.url}/donate`} activeClassName="active">Donate</NavLink></li>
      </ul>
    </div>
  </div>
);

const mapStateToProps = state => ({
  brandLogoUrl: state.home.brandLogoUrl
});

Header.propTypes = {
  match: PropTypes.object.isRequired,
  brandLogoUrl: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Header);
