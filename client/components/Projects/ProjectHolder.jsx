import React from 'react';
import ImageCarousal from '../../lib/ImageCarousal';

const ProjectHolder = ({pics, name, description}) => (
  <div className="project-holder">
    <h3>{name}</h3>
    <div className="project-carousal">
      <ImageCarousal imageLinks={pics.map(p => p.url)} viewDuration={5000}/>
    </div>
    <div className="project-info">
      <p>{description}</p>
    </div>
  </div>
);

export default ProjectHolder;
