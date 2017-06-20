import React from 'react';
import ProjectHolder from '../components/Projects/ProjectHolder';

const projects = [{
  imageLinks: [
    "/static/project1.jpg",
    "/static/project2.jpg"
  ],

  heading: "Safai Abhiyan",

  details: "We did this we did that"
}, {
  imageLinks: [
    "/static/project1.jpg",
    "/static/project2.jpg"
  ],

  heading: "Project #2",

  details: "We did number #2"
}];

const Projects = () => (
  <div className="projects">
    <h2>Projects Done</h2>{projects.map((project, index) => (
    <ProjectHolder key={index} {...project}/>))}
  </div>
);

export default Projects;
