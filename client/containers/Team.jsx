import React from 'react';
import {NavLink} from 'react-router-dom';

const Team = () => (
  <div className="team">
    <h1>Team</h1>
    <div className="page-content">
      <div className="trustees sub-team">
        <h2><NavLink to="trustees">TRUSTEES</NavLink></h2>
        <div className="details">
          Each one of our Trustees holds CRY’s interest above everything else,
          sharing a firm belief in values of public trust, collective …
          <div className="button-holder">
            <NavLink to="trustees" className="button">READ MORE</NavLink>
          </div>
        </div>
      </div>

      <div className="technical-team sub-team">
        <h2><NavLink to="technical-team">TECHNICAL TEAM</NavLink></h2>
        <div className="details">
          Each one of our Trustees holds CRY’s interest above everything else,
          sharing a firm belief in values of public trust, collective …
          <div className="button-holder">
            <NavLink to="technical-team" className="button">READ MORE</NavLink>
          </div>
        </div>
      </div>

      <div className="brand-ambassador sub-team">
        <h2><NavLink to="brand-ambassador">BRAND AMBASSADOR</NavLink></h2>
        <div className="details">
          Each one of our Trustees holds CRY’s interest above everything else,
          sharing a firm belief in values of public trust, collective …
          <div className="button-holder">
            <NavLink to="brand-ambassador" className="button">READ MORE</NavLink>
          </div>
        </div>
      </div>

      <div className="volunteers sub-team">
        <h2><NavLink to="volunteers">VOLUNTEERS</NavLink></h2>
        <div className="details">
          Each one of our Trustees holds CRY’s interest above everything else,
          sharing a firm belief in values of public trust, collective …
          <div className="button-holder">
            <NavLink to="volunteers" className="button">READ MORE</NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Team;
