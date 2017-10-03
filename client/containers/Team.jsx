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
            <button className="button">READ MORE</button>
          </div>
        </div>
      </div>

      <div className="technical-team sub-team">
        <h2><NavLink to="technical">TECHNICAL TEAM</NavLink></h2>
        <div className="details">
          Each one of our Trustees holds CRY’s interest above everything else,
          sharing a firm belief in values of public trust, collective …
          <div className="button-holder">
            <button className="button">READ MORE</button>
          </div>
        </div>
      </div>

      <div className="brand-ambassador sub-team">
        <h2><NavLink to="ambassador">BRAND AMBASSADOR</NavLink></h2>
        <div className="details">
          Each one of our Trustees holds CRY’s interest above everything else,
          sharing a firm belief in values of public trust, collective …
          <div className="button-holder">
            <button className="button">READ MORE</button>
          </div>
        </div>
      </div>

      <div className="volunteers sub-team">
        <h2><NavLink to="volunteers">VOLUNTEERS</NavLink></h2>
        <div className="details">
          Each one of our Trustees holds CRY’s interest above everything else,
          sharing a firm belief in values of public trust, collective …
          <div className="button-holder">
            <button className="button">READ MORE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Team;
