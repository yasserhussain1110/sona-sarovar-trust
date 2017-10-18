import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

const MediaEventsBlog = ({projectUrl, activityUrl}) => (
  <div className="media-events-blog">
    <h2>Media, Events and Blogs</h2>
    <div className="link-holder">
      <div className="donate">
        <h3>Donate to help</h3>
        <div className="iframe-holder">
          <iframe title="Our Movie" src="https://www.youtube.com/embed/VT3SRGNr22I" />
        </div>
        <NavLink to="web/involve/donate" className="button">Donate Now</NavLink>
      </div>
      <div className="events">
        <h3>Our Projects</h3>
        <div className="img-holder">
          <img alt="" src={projectUrl} />
        </div>
        <NavLink to="web/projects" className="button">See More</NavLink>
      </div>
      <div className="blog">
        <h3>Our Activities</h3>
        <div className="img-holder">
          <img alt="" src={activityUrl} />
        </div>
        <NavLink to="web/activities" className="button">See More</NavLink>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  let projectUrl = "";
  let activityUrl = "";

  if (state.projects.projectsDone.length > 0) {
    projectUrl = state.projects.projectsDone[0].pics[0].url;
  }

  if (state.activities.activitiesUndertaken.length > 0) {
    activityUrl = state.activities.activitiesUndertaken[0].pics[0].url;
  }

  return {projectUrl, activityUrl}
};

export default connect(mapStateToProps)(MediaEventsBlog);
