import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {facebook, twitter, linkedin, youtube} from 'react-icons-kit/fa';
import SvgIcon from 'react-icons-kit';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollState: "top"  // "top", "scrolled"
    };

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.setState({scrollState: "scrolled"});
      } else {
        this.setState({scrollState: "top"});
      }
    });
  }

  render() {
    return (
      <HeaderView
        match={this.props.match}
        brandLogoUrl={this.props.brandLogoUrl}
        scrollState={this.state.scrollState}
      />
    );
  }
}

const HeaderView = ({match, scrollState, brandLogoUrl}) => (
  <div className={`header ${scrollState}`}>
    <div className="logo-holder">
      <img src={brandLogoUrl}/>
    </div>
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
        <NavLink to="/web/donate" className="button donate">DONATE NOW</NavLink>
        <NavLink to="/web/volunteer" className="button volunteer">VOLUNTEER</NavLink>
      </div>
    </div>

    <div className="nav">
      <ul className="nav-bar">
        <li className="list-item">
          <NavLink exact to={`${match.url}`} activeClassName="active">HOME</NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`${match.url}/about`} activeClassName="active">ABOUT US</NavLink>
          <div className="sub-link-dropdown">
            <ul className="sub-link-nav-bar">
              <li className="sub-item">
                <NavLink to={`${match.url}/about`} activeClassName="active">HISTORY</NavLink>
              </li>
              <li className="sub-item">
                <NavLink to={`${match.url}/about`} activeClassName="active">VISION AND MISSION</NavLink>
              </li>
              <li className="sub-item">
                <NavLink to={`${match.url}/about`} activeClassName="active">TEAM</NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="list-item">
          <NavLink to={`${match.url}/projects`} activeClassName="active">WHAT WE DO</NavLink>
          <div className="sub-link-dropdown">
            <ul className="sub-link-nav-bar">
              <li className="sub-item">
                <NavLink to={`${match.url}/about`} activeClassName="active">HEALTH PROGRAM</NavLink>
              </li>
              <li className="sub-item">
                <NavLink to={`${match.url}/about`} activeClassName="active">EDUCATION PROGRAM</NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="list-item">
          <NavLink to={`${match.url}/involve`} activeClassName="active">GET INVOLVED</NavLink>
          <div className="sub-link-dropdown">
            <ul className="sub-link-nav-bar">
              <li className="sub-item">
                <NavLink to={`${match.url}/about`} activeClassName="active">DONATE</NavLink>
              </li>
              <li className="sub-item">
                <NavLink to={`${match.url}/about`} activeClassName="active">VOLUNTEER</NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="list-item">
          <NavLink to={`${match.url}/donate`} activeClassName="active">BLOG</NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`${match.url}/donate`} activeClassName="active">CONTACT US</NavLink>
        </li>
      </ul>
    </div>
  </div>
);

const mapStateToProps = state => ({
  brandLogoUrl: state.home.brandLogoUrl
});

export default connect(mapStateToProps)(Header);
