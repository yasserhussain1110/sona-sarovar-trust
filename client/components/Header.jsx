import React from 'react';
import {NavLink} from 'react-router-dom';

export default () => (
  <div className="header">
    <div className="logo">
      <div className="top-portion">CHILDREN</div>
      <div className="bottom-portion">OF AFRICA</div>
    </div>

    <div className="nav">
      <ul className="nav-bar">
        <li className="list-item"><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li className="list-item"><NavLink to="/about" activeClassName="active">ABOUT US</NavLink></li>
        <li className="list-item"><NavLink to="/projects" activeClassName="active">PROJECTS</NavLink></li>
        <li className="list-item"><NavLink to="/involve" activeClassName="active">GET INVOLVED</NavLink></li>
        <li className="list-item"><NavLink to="/donate" activeClassName="active">DONATE</NavLink></li>
      </ul>
    </div>
  </div>
);
