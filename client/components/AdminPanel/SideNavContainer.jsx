import React from 'react';
import {home} from 'react-icons-kit/icomoon';
import {calendar, user, eye, signOut} from 'react-icons-kit/fa';
import {ic_format_list_bulleted as icFormatListBulleted} from 'react-icons-kit/md/ic_format_list_bulleted';
import SideNavBar from './SideNavContainer/SideNavBar';
import SideNav from './SideNavContainer/SideNav';
import {logOut} from '../../lib/handlers/commonErrorsHandler';

const SideNavContainer = () => (
  <SideNavBar>
    <SideNav to="/admin/home" icon={home}>Home</SideNav>
    <SideNav to="/admin/projects" icon={icFormatListBulleted}>Projects</SideNav>
    <SideNav to="/admin/activities" icon={calendar}>Activities</SideNav>
    <SideNav to="/admin/team" icon={user}>Team</SideNav>
    <SideNav to="/admin/preview" icon={eye}>Preview</SideNav>
    <SideNav to="/admin/login" onClick={logOut} icon={signOut}>Log Out</SideNav>
  </SideNavBar>
);

export default SideNavContainer;
