import React from 'react';
import {NavLink} from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="links">
      <div className="about">
        <h6>About Us</h6>
        <ul>
          <li>
            <NavLink to="/web/about/history">History</NavLink>
          </li>
          <li>
            <NavLink to="/web/about/vision">Vision and Mission</NavLink>
          </li>
          <li>
            <NavLink to="/web/about/team">Team</NavLink>
          </li>
          <li>
            <NavLink to="/web/about/testimonials">Testimonials</NavLink>
          </li>
        </ul>
      </div>

      <div className="impact">
        <h6>Creating Impact</h6>
        <ul>
          <li>
            <NavLink to="/web/projects">Projects We Support</NavLink>
          </li>
          <li>
            <NavLink to="/web/activities">Activities We Take Part In</NavLink>
          </li>
        </ul>
      </div>

      <div className="help">
        <h6>How You Can Help</h6>
        <ul>
          <li>
            <NavLink to="/web/involve/donate/online">Donate Online</NavLink>
          </li>
          <li>
            <NavLink to="/web/involve/donate/offline">Other Ways to Donate</NavLink>
          </li>
          <li>
            <NavLink to="/web/involve/volunteer">Volunteer with Us</NavLink>
          </li>
        </ul>
      </div>

      <div className="info">
        <h6>Get Information</h6>
        <ul>
          <li>
            <NavLink to="/web/contact">Contact Us</NavLink>
          </li>
        </ul>
      </div>
    </div>

    <div className="copyright-info">
      <p>Copyright © 2017 Sona Sarovar Trust. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
