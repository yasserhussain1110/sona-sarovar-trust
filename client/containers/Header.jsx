import React from 'react';
import {NavLink} from 'react-router-dom';

export default ({match}) => (
  <div className="header">
    <div className="logo">
      <div className="top-portion">SONA</div>
      <div className="bottom-portion">TRUST</div>
    </div>

    <div className="nav">
      <ul className="nav-bar">
        <li className="list-item"><NavLink exact to={`${match.url}`} activeClassName="active">Home</NavLink></li>
        <li className="list-item"><NavLink to={`${match.url}/about`} activeClassName="active">About Us</NavLink></li>
        <li className="list-item"><NavLink to={`${match.url}/projects`} activeClassName="active">Projects</NavLink></li>
        <li className="list-item"><NavLink to={`${match.url}/activities`} activeClassName="active">Activities</NavLink></li>
        <li className="list-item"><NavLink to={`${match.url}/involve`} activeClassName="active">Get Involved</NavLink></li>
        <li className="list-item"><NavLink to={`${match.url}/donate`} activeClassName="active">Donate</NavLink></li>
      </ul>
    </div>
  </div>
);
