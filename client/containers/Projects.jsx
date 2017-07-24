import React from 'react';
import {connect} from 'react-redux';
import ProjectHolder from '../components/Projects/ProjectHolder';

const Projects = ({projectsDone}) => (
  <div className="projects">
    <h2>Projects Done</h2>{projectsDone.map((project, index) => (
    <ProjectHolder key={index} {...project}/>))}
  </div>
);

const mapStateToProps = state => (
  {
    projectsDone: state.projects.projectsDone
  }
);

export default connect(mapStateToProps)(Projects);
