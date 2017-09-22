import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {facebook, twitter, linkedin, youtube} from 'react-icons-kit/fa';
import SvgIcon from 'react-icons-kit';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HeaderView
        match={this.props.match}
      />
    );
  }
}

const HeaderView = ({match}) => (
  <div className="header">
    <div className="quick-links-holder">
      <div className="social-button-holder">
        <SvgIcon className="social-buttons" size={20} icon={facebook}/>
        <SvgIcon className="social-buttons" size={20} icon={twitter}/>
        <SvgIcon className="social-buttons" size={20} icon={linkedin}/>
        <SvgIcon className="social-buttons" size={20} icon={youtube}/>
      </div>
      <div className="action-button-holder">
        <button className="button">DONATE NOW</button>
        <button className="button">VOLUNTEER</button>
      </div>
    </div>

    <div className="nav">
      <ul className="nav-bar">
        <li className="list-item">
          <NavLink exact to={`${match.url}`} activeClassName="active">HOME</NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`${match.url}/about`} activeClassName="active">ABOUT US</NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`${match.url}/projects`} activeClassName="active">WHAT WE DO</NavLink>
        </li>
        <li className="list-item">
          <NavLink to={`${match.url}/involve`} activeClassName="active">GET INVOLVED</NavLink>
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

// const Header = () => (
//   <div className="header">
//   </div>
// );

// const Header = ({match, brandLogoUrl}) => (
//   <div className="header">
//     <div className="logo">
//       <img src={brandLogoUrl} />
//     </div>
//
//     <div className="nav">
//       <ul className="nav-bar">
//         <li className="list-item"><NavLink exact to={`${match.url}`} activeClassName="active">Home</NavLink></li>
//         <li className="list-item"><NavLink to={`${match.url}/about`} activeClassName="active">About Us</NavLink></li>
//         <li className="list-item"><NavLink to={`${match.url}/projects`} activeClassName="active">Projects</NavLink></li>
//         <li className="list-item"><NavLink to={`${match.url}/activities`} activeClassName="active">Activities</NavLink></li>
//         <li className="list-item"><NavLink to={`${match.url}/involve`} activeClassName="active">Get Involved</NavLink></li>
//         <li className="list-item"><NavLink to={`${match.url}/donate`} activeClassName="active">Donate</NavLink></li>
//       </ul>
//     </div>
//   </div>
// );

const mapStateToProps = state => ({
  brandLogoUrl: state.home.brandLogoUrl
});

export default connect(mapStateToProps)(Header);
