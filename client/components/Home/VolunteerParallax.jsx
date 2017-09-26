import React from 'react';
import {NavLink} from 'react-router-dom';

window.onscroll = () => {
  const parallaxElement = document.getElementsByClassName('volunteer-parallax')[0];
  const scrollFacter = window.scrollY / 20;
  parallaxElement.style.backgroundPositionY = (50 - scrollFacter) + '%';
};

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
