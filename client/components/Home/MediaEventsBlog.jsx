import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const MediaEventsBlog = ({projectUrl}) => (
  <div className="media-events-blog">
    <h2>Media, Events and Blogs</h2>
    <div className="link-holder">
      <div className="donate">
        <h3>Donate to help</h3>
        <div className="iframe-holder">
          <iframe title="Our Movie" src="https://www.youtube.com/embed/1Ye9HqlmcB4" />
        </div>
        <NavLink to="web/involve/donate" className="button">Donate Now</NavLink>
      </div>
      <div className="events">
        <h3>Our Projects</h3>
        <div className="img-holder">
          <img alt="Project Cover" src={projectUrl} />
        </div>
        <NavLink to="web/projects" className="button">See More</NavLink>
      </div>
      <div className="blog">
        <h3>Our Activities</h3>
        <div className="img-holder">
          <img alt="Activity Cover" src="/static/img/activity-cover.jpg" />
        </div>
        <NavLink to="web/activities" className="button">See More</NavLink>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  let projectUrl = '';

  if (state.projects.projectsDone.length > 0) {
    projectUrl = state.projects.projectsDone[0].pics[0].url;
  }

  return {projectUrl};
};

MediaEventsBlog.propTypes = {
  projectUrl: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(MediaEventsBlog);
