import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const clip = (str, length) => str.length < length ? str : str.substring(0, length - 3) + "...";

const ActivityListPanel = ({activities}) => (
  <div className="project-list-panel">
    <div className="add-project-wrapper">
      <h2>Add an Activity</h2>
      <div className="link-holder">
        <Link className="success-button" to="/admin/activities/add">Add a New Activity</Link>
      </div>
    </div>

    <div className="list-project-wrapper">
      <h2>List of Activities</h2>
      <div className="project-list-container">
        <ul className="project-list">{activities.map((activity, index) => (
          <li key={index} className="project">
            <div className="sl">#{index + 1}</div>
            <div className="img-holder">
              <img src={activity.pics[0].url}/>
            </div>
            <div className="name">{activity.name}</div>
            <div className="description">{clip(activity.description, 40)}</div>
            <div className="button-holder">
              <button className="edit-button">
                <Link to={`/admin/activities/edit/${index}`}>Edit</Link>
              </button>
              <button className="delete-button">Delete</button>
            </div>
          </li>))}
        </ul>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    activities: state.activities.activitiesUndertaken
  }
);

export default connect(mapStateToProps)(ActivityListPanel);
