import React from 'react';
import {connect} from 'react-redux';
import ImageCarousal from '../lib/components/ImageCarousal';

const ActivityHolder = ({activity}) => {
  if (!activity) {
    return <div className="project-holder">No Such Activity Found</div>;
  }

  let {name, description, pics} = activity;
  return (
    <div className="activity-holder">
      <h1>{name}</h1>
      <div className="page-content">
        <div className="activity-image-carousal">
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
    activity: state.activities.activitiesUndertaken[ownProps.match.params.index]
  }
);

export default connect(mapStateToProps)(ActivityHolder);
