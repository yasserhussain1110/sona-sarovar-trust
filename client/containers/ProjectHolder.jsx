import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ImageCarousal from '../lib/components/ImageCarousal';

const ProjectHolder = ({project}) => {
  if (!project) {
    return <div className="project-holder">No Such Project Found</div>;
  }

  const {name, description, pics} = project;
  return (
    <div className="project-holder">
      <h1>{name}</h1>
      <div className="page-content">
        <div className="project-image-carousal">
          <ImageCarousal
            viewDuration={8000}
            imageLinks={pics.map(pic => pic.url)}
            dots
            arrows
          />
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

ProjectHolder.defaultProps = {
  project: null
};

ProjectHolder.propTypes = {
  project: PropTypes.object
};

export default connect(mapStateToProps)(ProjectHolder);
