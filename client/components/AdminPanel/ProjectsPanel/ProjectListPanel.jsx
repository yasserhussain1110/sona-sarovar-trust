import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const clip = (str, length) => str.length < length ? str : str.substring(0, length - 3) + "...";

const ProjectListPanel = ({projects}) => (
  <div className="project-list-panel">
    <div className="add-project-wrapper">
      <h2>Add a project</h2>
      <div className="link-holder">
        <Link className="success-button" to="/admin/projects/add">Add a New Project</Link>
      </div>
    </div>

    <div className="list-project-wrapper">
      <h2>List of projects</h2>
      <div className="project-list-container">
        <ul className="project-list">{projects.map((project, index) => (
          <li key={index} className="project">
            <div className="sl">#{index + 1}</div>
            <div className="img-holder">
              <img src={project.pics[0].url}/>
            </div>
            <div className="name">{project.name}</div>
            <div className="description">{clip(project.description, 40)}</div>
            <div className="button-holder">
              <button className="edit-button">Edit</button>
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
    projects: state.projects.projectsDone
  }
);

export default connect(mapStateToProps)(ProjectListPanel);
