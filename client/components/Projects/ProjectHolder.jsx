import React from 'react';
import ImageCarousal from '../../lib/ImageCarousal';

const imageLinks = [
  "/static/project1.jpg",
  "/static/project2.jpg"
];

const ProjectHolder = () => (
  <div className="project-holder">
    <h3>Safai Abhiyan</h3>
    <div className="project-carousal">
      <ImageCarousal imageLinks={imageLinks} viewDuration={5000}/>
    </div>
    <div className="project-info">
      <p>This That.</p>
    </div>
  </div>
);

export default ProjectHolder;
