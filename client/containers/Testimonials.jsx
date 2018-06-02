import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Testimonials = ({testimonials}) => (
  <div className="testimonials">
    <h1>Testimonials</h1>
    <div className="page-content">
      {
        testimonials.map(testimonial => (
          <div className="testimonial-holder" key={testimonial.id}>
            <h2 className="testimonial-header">
              {testimonial.heading}
            </h2>
            <p className="testimonial-content">
              {testimonial.message}
            </p>
            <span className="person-name">
              <h3>
                {testimonial.testimonialGiverName}
              </h3>
            </span>
            <span className="person-designation">
              <h3>
                {testimonial.testimonialGiverDesignation}
              </h3>
            </span>
            <span className="person-location">
              <h3>
                {testimonial.testimonialGiverLocation}
              </h3>
            </span>
          </div>
        ))
      }
    </div>
  </div>
);

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  testimonials: state.testimonials
});

export default connect(mapStateToProps)(Testimonials);
