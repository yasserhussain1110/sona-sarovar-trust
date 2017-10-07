import React from 'react';
import {NavLink} from 'react-router-dom';
import SvgIcon from 'react-icons-kit';
import PropTypes from 'prop-types';

const SideNav = ({children, pathname, to, icon, onClick}) => (
  <li className={pathname.startsWith(to) ? 'selected' : ''}>
    <NavLink onClick={onClick} to={to}>
      <div className="icon-holder">
        <SvgIcon size={20} icon={icon} />
      </div>
      <div className="link-text">{children}</div>
    </NavLink>
  </li>
);

SideNav.defaultProps = {
  onClick: null,
  pathname: ''
};

SideNav.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  pathname: PropTypes.string,
  onClick: PropTypes.func
};

export default SideNav;
