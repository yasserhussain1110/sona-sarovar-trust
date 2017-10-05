import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

const Activities = ({match, activitiesUndertaken}) => (
  <div className="activities">
    <h1>Our Activities</h1>
    <div className="page-content">
      <div className="explanation">
        <p>
          Some of our activities for children.
        </p>
      </div>

      <div className="activity-list">{activitiesUndertaken.map((activity, index) => (
        <div key={index} className="activity-container">
          <NavLink to={`${match.url}/${index}`}>
            <div className="activity-name-holder">
              <span>{activity.name}</span>
            </div>
          </NavLink>
        </div>))}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    activitiesUndertaken: state.activities.activitiesUndertaken
  }
);

export default connect(mapStateToProps)(Activities);
