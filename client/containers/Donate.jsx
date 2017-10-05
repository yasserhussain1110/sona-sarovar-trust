import React from 'react';
import {NavLink} from 'react-router-dom';

const Donate = () => (
  <div className="donate">
    <h1>Donate</h1>
    <div className="page-content">
      <h3>Please choose one of the following methods of donation</h3>
      <div className="donation-button-holder">
        <NavLink to="donate/offline" className="button">Donate Offline</NavLink>
        <NavLink to="donate/online"  className="button">Donate Online</NavLink>
      </div>
    </div>
  </div>
);

export default Donate;
