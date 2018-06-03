import React from 'react';
import {home} from 'react-icons-kit/icomoon';
import {calendar, eye, signOut, group, star, code, infoCircle} from 'react-icons-kit/fa';
import {ic_format_list_bulleted as icFormatListBulleted} from 'react-icons-kit/md/ic_format_list_bulleted';
import {userTie} from 'react-icons-kit/icomoon/userTie';
import SideNavBar from './SideNavContainer/SideNavBar';
import SideNav from './SideNavContainer/SideNav';
import {logOut} from '../../lib/handlers/commonErrorsHandler';

const SideNavContainer = () => (
  <SideNavBar>
    <SideNav to="/admin/home" icon={home}>Home</SideNav>
    <SideNav to="/admin/about" icon={infoCircle}>About Us</SideNav>
    <SideNav to="/admin/projects" icon={icFormatListBulleted}>Projects</SideNav>
    <SideNav to="/admin/activities" icon={calendar}>Activities</SideNav>
    <SideNav to="/admin/trustees" icon={userTie}>Trustees</SideNav>
    <SideNav to="/admin/volunteers" icon={group}>Volunteers</SideNav>
    <SideNav to="/admin/technical" icon={code}>TechnicalTeam</SideNav>
    <SideNav to="/admin/ambassador" icon={star}>Ambassador</SideNav>
    <SideNav to="/admin/testimonials" icon={star}>Testimonials</SideNav>
    <SideNav to="/admin/preview" icon={eye}>Preview</SideNav>
    <SideNav to="/admin/awards" icon={eye}>Awards</SideNav>
    <SideNav to="/admin/login" onClick={logOut} icon={signOut}>Log Out</SideNav>
  </SideNavBar>
);

export default SideNavContainer;
