import React from 'react';
import ImageCarousal from '../../lib/components/ImageCarousal';

const ActivityHolder = ({imageLinks, heading, details}) => (
  <div className="activity-holder">
    <h3>{heading}</h3>
    <div className="activity-carousal">
      <ImageCarousal imageLinks={imageLinks} viewDuration={5000}/>
    </div>
    <div className="activity-info">
      <p>{details}</p>
    </div>
  </div>
);

export default ActivityHolder;
