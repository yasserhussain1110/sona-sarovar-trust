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

      <div className="text-container">
        <p>
          We have received the above award from Global Start.
          They have appreciated our efforts.
        </p>
      </div>
    </div>
  </div>
);

export default OurAwards;
