import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

const Projects = ({match, projectsDone}) => (
  <div className="projects">
    <h1>Our Projects</h1>
    <div className="page-content">
      <div className="explanation">
        <p>
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
          We do many projects for the benefit of the people
        </p>
      </div>

      <div className="project-list">{projectsDone.map((project, index) => (
        <div key={index} style={{backgroundImage: `url('${project.pics[0].url}')`}} className="project-container">
          <NavLink to={`${match.url}/${index}`}>
            <div className="project-name-holder">
              <span>{project.name}</span>
            </div>
          </NavLink>
        </div>))}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    projectsDone: state.projects.projectsDone
  }
);

Projects.propTypes = {
  projectsDone: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Projects);
