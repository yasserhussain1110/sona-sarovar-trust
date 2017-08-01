import React from 'react';
import {SideNav, Nav, NavIcon, NavText} from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {ic_aspect_ratio} from 'react-icons-kit/md/ic_aspect_ratio';
import {ic_business} from 'react-icons-kit/md/ic_business';
import { home } from 'react-icons-kit/icomoon';
import {ic_format_list_bulleted} from 'react-icons-kit/md/ic_format_list_bulleted';

const Title = styled.div`
    padding: 12px;
`;

const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon}/>;

const BasicSideNav = ({adminMatch, history}) => (
  <SideNav highlightBgColor="#00bcd4" defaultSelected="sales"
           onItemSelection={id => (history.push(adminMatch.url + "/" + id))}>
    <Title> Basic SideNav </Title>
    <Nav id="home">
      <NavIcon><Icon20 icon={home}/></NavIcon>
      <NavText> Home </NavText>
      <Nav id="center-theme">
        <NavIcon><Icon20 size={16} icon={ic_aspect_ratio}/></NavIcon>
        <NavText> Center Theme </NavText>
      </Nav>
      <Nav id="info">
        <NavIcon><Icon20 size={16} icon={ic_business}/></NavIcon>
        <NavText> Info </NavText>
      </Nav>
    </Nav>
    <Nav id="projects">
      <NavIcon><Icon20 icon={ic_format_list_bulleted}/></NavIcon>
      <NavText> Projects </NavText>
    </Nav>
  </SideNav>
);

export default withRouter(BasicSideNav);
