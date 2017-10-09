import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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
        <div key={index} style={{backgroundImage: `url(${activity.pics[0].url})`}} className="activity-container">
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

Activities.propTypes = {
  activitiesUndertaken: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Activities);
