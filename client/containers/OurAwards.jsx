import React from 'react';
import ImageCarousal from '../lib/components/ImageCarousal';

const awardImageLinks = [
  '/static/img/guide-star1.png',
  '/static/img/guide-star2.png'
];

const OurAwards = () => (
  <div className="our-awards">
    <h1>Our Awards</h1>
    <div className="page-content">
      <div className="img-container">
        <ImageCarousal
          dots
          arrows
          imageLinks={awardImageLinks}
          viewDuration={5000}
        />
      </div>
    </div>
  </div>
);

export default OurAwards;
