import React from 'react';
import {NavLink} from 'react-router-dom';

const Testimonials = () => (
  <div className="testimonials">
    <h2>Donor Speak</h2>
    <blockquote>
      <p>
        Changing the lives of children is a continuous process.
        Nothing can be done in a limited period.
        As individuals we have to continue to give support by way of financial
        help, time as well as other resources.
        I believe in continuity and devotion without deviation. CRY is doing just that.
      </p>
      <footer>
        <span>Pawan Gupta</span>
        <cite>(Donor, Mumbai)</cite>
        <NavLink to="" className="button">More</NavLink>
      </footer>
    </blockquote>
  </div>
);

export default Testimonials;
