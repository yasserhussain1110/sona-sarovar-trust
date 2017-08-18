import React from 'react';
import {Link} from 'react-router-dom';

const ProjectListPanel = () => (
  <div className="project-list-panel">
    <div className="add-project">
      <h2>Add a project</h2>
      <button><Link to="/admin/projects/add">Add a New Project</Link></button>
    </div>

    {/*<div className="list-project">*/}
      {/*<h2>List of projects</h2>*/}
      {/*<div className="project-list-container">*/}
        {/*<ul className="project-list">{projects.map((project, index) => (*/}
          {/*<li key={index} className="project">*/}
            {/*<div className="sl">#{index + 1}</div>*/}
            {/*<div className="img-holder">*/}
              {/*<img src={project.pics[0].url}/>*/}
            {/*</div>*/}
            {/*<div className="name">{project.name}</div>*/}
            {/*<div className="description">{clip(project.description, 40)}</div>*/}
            {/*<div className="button-holder">*/}
              {/*<button>Edit</button>*/}
              {/*<button>Delete</button>*/}
            {/*</div>*/}
          {/*</li>))}*/}
        {/*</ul>*/}
      {/*</div>*/}
    {/*</div>*/}
  </div>
);

export default ProjectListPanel;
