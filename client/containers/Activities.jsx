import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Activities = ({activitiesUndertaken}) => (
  <div className="activities">
    <h3><span>Activities</span></h3>
    <div className="activity-list">{activitiesUndertaken.map((activity, index) => (
      <div key={index} className="activity">
        <Link to={`/web/activities/${index}`}>
          <img src={activity.pics[0].url}/>
          <h4>
            <span>{activity.name}</span>
          </h4>
        </Link>
      </div>))}
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    activitiesUndertaken: state.activities.activitiesUndertaken
  }
);

export default connect(mapStateToProps)(Activities);