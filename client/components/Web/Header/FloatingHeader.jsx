import React from 'react';
import {NavLink} from 'react-router-dom';
import {facebook, twitter, linkedin, youtube, caretDown} from 'react-icons-kit/fa';
import SvgIcon from 'react-icons-kit';

const FloatingHeader = ({visibilityClass, brandLogoUrl, match}) => (
  <div className={`floating-header ${visibilityClass}`}>
    <div className="logo-holder">
      <img src={brandLogoUrl}/>
    </div>

    <NormalNav match={match}/>

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

    <label className="noselect" htmlFor="float-dropper">
      <SvgIcon icon={caretDown} size={20}/>
    </label>

    <DropdownNav match={match}/>
  </div>
);

const DropdownNav = ({match}) => (
  <div className="drop-down-nav-holder">
    <input id="float-dropper" type="checkbox"/>
    <div className="nav drop-down-nav">
      <ul className="nav-bar">
        <li className="list-item">
          <NavLink exact to={`${match.url}`} activeClassName="active">HOME</NavLink>
        </li>
        <li className="list-item">
          <label htmlFor="float-checkbox1" className="dropper-label noselect">
            ABOUT US
          </label>
          <input id="float-checkbox1" type="checkbox" className="toggler"/>
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
          <label htmlFor="float-checkbox2" className="dropper-label noselect">
            WHAT WE DO
          </label>
          <input id="float-checkbox2" type="checkbox" className="toggler"/>
          <div className="sub-link-dropdown">
            <ul className="sub-link-nav-bar">
              <li className="sub-item">
                <NavLink to={`${match.url}/projects`} activeClassName="active">PROJECTS</NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="list-item">
          <label htmlFor="float-checkbox3" className="dropper-label noselect">
            GET INVOLVED
          </label>
          <input id="float-checkbox3" type="checkbox" className="toggler"/>
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

export default FloatingHeader;
