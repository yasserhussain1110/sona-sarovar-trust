import React from 'react';
import {NavLink} from 'react-router-dom';
import SvgIcon from 'react-icons-kit';

const SideNav = ({children, pathname, to, icon, onClick}) => (
  <li className={pathname.startsWith(to) ? 'selected' : ''}>
    <NavLink onClick={onClick} to={to}>
      <div className="icon-holder">
        <SvgIcon size={20} icon={icon}/>
      </div>
      <div className="link-text">{children}</div>
    </NavLink>
  </li>
);


export default SideNav;
