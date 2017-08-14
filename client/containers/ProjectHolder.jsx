import React from 'react';
import {connect} from 'react-redux';
import ImageCarousal from '../lib/components/ImageCarousal';

const ProjectHolder = ({match, projects}) => {
  let project = projects[match.params.index];
  if (!project) {
    return <div className="project-holder">No Such Project Found</div>;
  }

  let {name, description, pics} = project;
  return (
    <div className="project-holder">
      <h3><span>{name}</span></h3>
      <div className="project-carousal">
        <ImageCarousal imageLinks={pics.map(p => p.url)} viewDuration={5000}/>
      </div>
      <div className="project-info">
        <p>{description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => (
  {
    projects: state.projects.projectsDone
  }
);

export default connect(mapStateToProps)(ProjectHolder);
