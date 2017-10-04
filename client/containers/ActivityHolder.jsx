import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ImageCarousal from '../lib/components/ImageCarousal';

const ActivityHolder = ({activity}) => {
  if (!activity) {
    return <div className="activity-holder">No Such Activity Found</div>;
  }

  const {name, description, pics} = activity;
  return (
    <div className="activity-holder">
      <h3><span>{name}</span></h3>
      <div className="activity-carousal">
        <ImageCarousal imageLinks={pics.map(p => p.url)} viewDuration={5000} />
      </div>
      <div className="activity-info">
        <p>{description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => (
  {
    activity: state.activities.activitiesUndertaken[ownProps.match.params.index]
  }
);

ActivityHolder.propTypes = {
  activity: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ActivityHolder);
