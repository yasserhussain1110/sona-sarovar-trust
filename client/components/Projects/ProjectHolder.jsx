import React from 'react';
import ImageCarousal from '../../lib/ImageCarousal';

const ProjectHolder = ({imageLinks, heading, details}) => (
  <div className="project-holder">
    <h3>{heading}</h3>
    <div className="project-carousal">
      <ImageCarousal imageLinks={imageLinks} viewDuration={5000}/>
    </div>
    <div className="project-info">
      <p>{details}</p>
    </div>
  </div>
);

export default ProjectHolder;
