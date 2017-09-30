import React from 'react';
import {NavLink} from 'react-router-dom';
import {facebook, twitter, linkedin, youtube} from 'react-icons-kit/fa';
import SvgIcon from 'react-icons-kit';

const FixedHeader = ({brandLogoUrl, match, visibilityClass}) => (
  <div className={`fixed-header ${visibilityClass}`}>
    <div className="logo-holder">
      <img src={brandLogoUrl}/>
    </div>

    <div className="floater clearfix">
      <div className="quick-links-holder">
        <div className="social-button-holder">
          <a href="https://www.facebook.com">
            <SvgIcon className="social-button fb" size={20} icon={facebook}/>
          </a>
          <a href="https://www.twitter.com">
            <SvgIcon className="social-button tw" size={20} icon={twitter}/>
          </a>
          <a href="https://www.linkedin.com">
            <SvgIcon className="social-button li" size={20} icon={linkedin}/>
          </a>
          <a href="https://www.youtube.com">
            <SvgIcon className="social-button yt" size={20} icon={youtube}/>
          </a>
        </div>
        <div className="action-button-holder">
          <NavLink to={`${match.url}/involve/donate`} className="button donate">DONATE NOW</NavLink>
          <NavLink to={`${match.url}/involve/volunteer`} className="button volunteer">VOLUNTEER</NavLink>
        </div>
      </div>
    </div>

    <DropdownNav match={match}/>
    <NormalNav match={match}/>
  </div>
);

const NormalNav = ({match}) => (
  <div className="nav normal-nav">
    <ul className="nav-bar">
      <li className="list-item">
        <NavLink exact to={`${match.url}`} activeClassName="active">HOME</NavLink>
      </li>
      <li className="list-item">
        <NavLink to="#" activeClassName="active">ABOUT US</NavLink>
        <div className="sub-link-dropdown">
          <ul className="sub-link-nav-bar">
            <li className="sub-item">
              <NavLink to={`${match.url}/about/history`} activeClassName="active">HISTORY</NavLink>
            </li>
            <li className="sub-item">
              <NavLink to={`${match.url}/about/vision`} activeClassName="active">VISION AND MISSION</NavLink>
            </li>
            <li className="sub-item">
              <NavLink to={`${match.url}/about/team`} activeClassName="active">TEAM</NavLink>
            </li>
          </ul>
        </div>
      </li>
      <li className="list-item">
        <NavLink to="#" activeClassName="active">WHAT WE DO</NavLink>
        <div className="sub-link-dropdown">
          <ul className="sub-link-nav-bar">
            <li className="sub-item">
              <NavLink to={`${match.url}/projects`} activeClassName="active">PROJECTS</NavLink>
            </li>
          </ul>
        </div>
      </li>
      <li className="list-item">
        <NavLink to="#" activeClassName="active">GET INVOLVED</NavLink>
        <div className="sub-link-dropdown">
          <ul className="sub-link-nav-bar">
            <li className="sub-item">
              <NavLink to={`${match.url}/involve/donate`} activeClassName="active">DONATE</NavLink>
            </li>
            <li className="sub-item">
              <NavLink to={`${match.url}/involve/volunteer`} activeClassName="active">VOLUNTEER</NavLink>
            </li>
          </ul>
        </div>
      </li>
      <li className="list-item">
        <NavLink to={`${match.url}/blog`} activeClassName="active">BLOG</NavLink>
      </li>
      <li className="list-item">
        <NavLink to={`${match.url}/contact`} activeClassName="active">CONTACT US</NavLink>
      </li>
    </ul>
  </div>
);

const DropdownNav = ({match}) => (
  <div className="hamburger-nav">
    <label htmlFor="drop-down">
      <div className="hamburger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </label>

    <input id="drop-down" type="checkbox"/>

    <div className="nav">
      <ul className="nav-bar">
        <li className="list-item">
          <NavLink exact to={`${match.url}`} activeClassName="active">HOME</NavLink>
        </li>
        <li className="list-item">
          <label htmlFor="checkbox1" className="dropper-label noselect">
            ABOUT US
          </label>
          <input id="checkbox1" type="checkbox" className="toggler"/>
          <div className="sub-link-dropdown">
            <ul className="sub-link-nav-bar">
              <li className="sub-item">
                <NavLink to={`${match.url}/about/history`} activeClassName="active">HISTORY</NavLink>
              </li>
              <li className="sub-item">
                <NavLink to={`${match.url}/about/vision`} activeClassName="active">VISION AND MISSION</NavLink>
              </li>
              <li className="sub-item">
                <NavLink to={`${match.url}/about/team`} activeClassName="active">TEAM</NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="list-item">
          <label htmlFor="checkbox2" className="dropper-label noselect">
            WHAT WE DO
          </label>
          <input id="checkbox2" type="checkbox" className="toggler"/>
          <div className="sub-link-dropdown">
            <ul className="sub-link-nav-bar">
              <li className="sub-item">
                <NavLink to={`${match.url}/projects`} activeClassName="active">PROJECTS</NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="list-item">
          <label htmlFor="checkbox3" className="dropper-label noselect">
            GET INVOLVED
          </label>
          <input id="checkbox3" type="checkbox" className="toggler"/>
          <div className="sub-link-dropdown">
            <ul className="sub-link-nav-bar">
              <li className="sub-item">
                <NavLink to={`${match.url}/involve/donate`} activeClassName="active">DONATE</NavLink>
              </li>
              <li className="sub-item">
                <NavLink to={`${match.url}/involve/volunteer`} activeClassName="active">VOLUNTEER</NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="list-item">
          <NavLink to={`${match.url}/blog`} activeClassName="active">BLOG</NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`${match.url}/contact`} activeClassName="active">CONTACT US</NavLink>
        </li>
      </ul>
    </div>
  </div>
);

export default FixedHeader;
