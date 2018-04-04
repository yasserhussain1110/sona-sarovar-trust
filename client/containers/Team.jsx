import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

const Team = ({match}) => (
  <div className="team">
    <h1>Team</h1>
    <div className="page-content">
      <div className="trustees sub-team">
        <h2><NavLink to={`${match.url}/trustees`}>TRUSTEES</NavLink></h2>
        <div className="details">
          Each one of our Trustees holds our trust&quot;s interest above everything else,
          sharing a firm belief in values of public trust, collective …
          <div className="button-holder">
            <NavLink to={`${match.url}/trustees`} className="button">READ MORE</NavLink>
          </div>
        </div>
      </div>

      <div className="technical-team sub-team">
        <h2><NavLink to={`${match.url}/technical-team`}>TECHNICAL TEAM</NavLink></h2>
        <div className="details">
          The technical team helps in maintaing the website from across geographies.
          <div className="button-holder">
            <NavLink to={`${match.url}/technical-team`} className="button">READ MORE</NavLink>
          </div>
        </div>
      </div>

      <div className="brand-ambassador sub-team">
        <h2><NavLink to={`${match.url}/brand-ambassador`}>BRAND AMBASSADOR</NavLink></h2>
        <div className="details">
        Miss Priya is an Internationally Acclaimed Motivational Speaker, Bestselling Author of 10 Inspirational Books & Founder Trustee.
          <div className="button-holder">
            <NavLink to={`${match.url}/brand-ambassador`} className="button">READ MORE</NavLink>
          </div>
        </div>
      </div>

      <div className="volunteers sub-team">
        <h2><NavLink to={`${match.url}/volunteers`}>VOLUNTEERS</NavLink></h2>
        <div className="details">
        Age/Status is no Bar.Our volunteers work tirelessly without expecting any Award or Reward.
          <div className="button-holder">
            <NavLink to={`${match.url}/volunteers`} className="button">READ MORE</NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Team.propTypes = {
  match: PropTypes.object.isRequired
};

export default Team;
