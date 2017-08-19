import React from 'react';
import SideNavBar from './SideNavContainer/SideNavBar';
import SideNav from './SideNavContainer/SideNav';
import {home} from 'react-icons-kit/icomoon';
import {ic_format_list_bulleted} from 'react-icons-kit/md/ic_format_list_bulleted';

const SideNavContainer = props => (
  <SideNavBar>
    <SideNav to="/admin/home" icon={home}>Home</SideNav>
    <SideNav to="/admin/projects" icon={ic_format_list_bulleted}>Projects</SideNav>
  </SideNavBar>
);

export default SideNavContainer;
