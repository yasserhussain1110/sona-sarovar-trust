import React from 'react';
import {child, university, userMd} from 'react-icons-kit/fa';
import SvgIcon from 'react-icons-kit';

const OurImpact = () => (
  <div className="our-impact">
    <h2>Our Impact</h2>
    <div className="child-icon-holder">
      <SvgIcon icon={child} size={80}/>
    </div>
    <div className="impact-list-holder">
      <div className="icon-list-holder">
        <ul>
          <li>
            <SvgIcon icon={university} size={40}/>
          </li>
          <li>
            <SvgIcon icon={userMd} size={40}/>
          </li>
        </ul>
      </div>

      <div className="message-list-holder">
        <ul>
          <li>
            <div className="message-holder">
              <h3 className="figure">500</h3>
              <p className="message">children sent to school.</p>
            </div>
          </li>
          <li>
            <div className="message-holder">
              <h3 className="figure">700</h3>
              <p className="message">
                malnourished children given health treatment.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="registration-number-holder">
        <ul>
          <li>Public Trust Reg.No.F-5208</li>
        </ul>
      </div>
    </div>
  </div>
);

export default OurImpact;
