import React from 'react';
import {connect} from 'react-redux';
import ImageCarousal from '../lib/components/ImageCarousal';

const ProjectHolder = ({project}) => {
  if (!project) {
    return <div className="project-holder">No Such Project Found</div>;
  }

  let {name, description, pics} = project;
  return (
    <div className="project-holder">
      <h1>{name}</h1>
      <div className="page-content">
        <div className="project-image-carousal">
          <ImageCarousal
            viewDuration={8000}
            imageLinks={pics.map(pic => pic.url)}
            dots={true}
            arrows={true}/>
        </div>

        <div className="description-holder">
          {description}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => (
  {
    project: state.projects.projectsDone[ownProps.match.params.index]
  }
);

export default connect(mapStateToProps)(ProjectHolder);
