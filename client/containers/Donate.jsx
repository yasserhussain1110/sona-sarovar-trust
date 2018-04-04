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
        <a href="https://sonasarovartrust.ketto.org/contribute/contribute.php?fmd_id=25337" target="_blank" className="button">Via Ketto</a>
      </div>
    </div>
  </div>
);

export default Donate;
