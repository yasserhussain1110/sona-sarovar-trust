import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Projects = ({projectsDone}) => (
  <div className="projects">
    <h3><span>Projects</span></h3>
    <div className="project-list">{projectsDone.map((project, index) => (
      <div key={index} className="project">
        <Link to={`/web/projects/${index}`}>
          <img src={project.pics[0].url}/>
          <h4>
            <span>{project.name}</span>
          </h4>
        </Link>
      </div>))}
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    projectsDone: state.projects.projectsDone
  }
);

export default connect(mapStateToProps)(Projects);
