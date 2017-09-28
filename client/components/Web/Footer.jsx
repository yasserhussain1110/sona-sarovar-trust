import React from 'react';
import {NavLink} from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="links">
      <div className="about">
        <h6>About Us</h6>
        <ul>
          <li>
            <NavLink to="">History</NavLink>
          </li>
          <li>
            <NavLink to="">Vision and Mission</NavLink>
          </li>
          <li>
            <NavLink to="">Team</NavLink>
          </li>
          <li>
            <NavLink to="">Issues And Views</NavLink>
          </li>
          <li>
            <NavLink to="">Financials</NavLink>
          </li>
          <li>
            <NavLink to="">Media Center</NavLink>
          </li>
          <li>
            <NavLink to="">Testimonials</NavLink>
          </li>
          <li>
            <NavLink to="">FAQs</NavLink>
          </li>
        </ul>
      </div>

      <div className="impact">
        <h6>Creating Impact</h6>
        <ul>
          <li>
            <NavLink to="">About Child Rights</NavLink>
          </li>
          <li>
            <NavLink to="">Statistics of Children in India</NavLink>
          </li>
          <li>
            <NavLink to="">Our Approach</NavLink>
          </li>
          <li>
            <NavLink to="">Nature of Support</NavLink>
          </li>
          <li>
            <NavLink to="">Projects We Support</NavLink>
          </li>
          <li>
            <NavLink to="">Stories of Hope</NavLink>
          </li>
        </ul>
      </div>

      <div className="help">
        <h6>How You Can Help</h6>
        <ul>
          <li>
            <NavLink to="">Donate Online</NavLink>
          </li>
          <li>
            <NavLink to="">Other Ways to Donate</NavLink>
          </li>
          <li>
            <NavLink to="">Volunteer with CRY</NavLink>
          </li>
          <li>
            <NavLink to="">Campaigns</NavLink>
          </li>
          <li>
            <NavLink to="">Advocate</NavLink>
          </li>
          <li>
            <NavLink to="">Corporates</NavLink>
          </li>
          <li>
            <NavLink to="">Child Rights Fellowships</NavLink>
          </li>
          <li>
            <NavLink to="">Shop</NavLink>
          </li>
          <li>
            <NavLink to="">Careers</NavLink>
          </li>
          <li>
            <NavLink to="">Honour Roll</NavLink>
          </li>
        </ul>
      </div>

      <div className="info">
        <h6>Get Information</h6>
        <ul>
          <li>
            <NavLink to="">Privacy Policy</NavLink>
          </li>
          <li>
            <NavLink to="">Disclaimer</NavLink>
          </li>
          <li>
            <NavLink to="">Acknowledgement</NavLink>
          </li>
          <li>
            <NavLink to="">Sitemap</NavLink>
          </li>
          <li>
            <NavLink to="">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="">Resources</NavLink>
          </li>
        </ul>
      </div>
    </div>

    <div className="copyright-info">
      <p>Copyright © 2017 CRY - Child Rights and You. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
