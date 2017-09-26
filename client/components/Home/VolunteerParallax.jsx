import React from 'react';
import {NavLink} from 'react-router-dom';
import {addHandler, getScrollHandlerForParallax} from '../../lib/helpers/domHelpers';

document.addEventListener('DOMContentLoaded', () => {
  addHandler(window, 'onscroll', {
    name: 'genericScrollHandler',
    func: getScrollHandlerForParallax()
  });
});

const VolunteerParallax = () => (
  <div className="volunteer-parallax">
    <div className="parallax-content">
      <h1>Volunteer</h1>
      <p>
        Our volunteers are awesome. You can be too.
        Please join us and help us with this work.
        That'll prove your awesome. Many people
        from all walks of life come and join us.
        You should too. It will make a huge difference
        in lives of the underprivileged children.
      </p>

      <div className="button-holder">
        <NavLink to="" className="button button-donate">
          Join Now
        </NavLink>
      </div>
    </div>
  </div>
);

export default VolunteerParallax;
