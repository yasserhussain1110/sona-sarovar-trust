import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ImageCarousal from '../lib/components/ImageCarousal';

const OurAwards = ({awardUrls}) => (
  <div className="our-awards">
    <h1>Our Awards</h1>
    <div className="page-content">
      <div className="img-container">
        <ImageCarousal
          dots
          arrows
          imageLinks={awardUrls}
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

const mapStateToProps = state => ({
  awardUrls: state.awards.map(award => award.url)
});

OurAwards.propTypes = {
  awardUrls: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default connect(mapStateToProps)(OurAwards);
