import React from 'react';
import {NavLink} from 'react-router-dom';

const Testimonials = () => (
  <div className="testimonials">
    <h2>Donor Speak</h2>
    <blockquote>
      <p>
        Next to our Elite Complex, there are a number of sprawling slums. I always thought that I must do something for
        the people of these areas who have equal rights to live decent lives just as we do. They must get the basic
        education and health facilities. What kind of society or nation we are going to create when millions of people
        are in dire need of food, education and elementary health facilities?. During one of my visits to these areas I
        came across Sona Sarovar Trust and in particular Ms. Sona Kumar who has been doing exemplary work in her own
        small way. Since then I have been supporting her by contributing my time and the fund.
      </p>
      <footer>
        <span>Mr. Pradyumn Patel</span>
        <cite>(Social Worker, Mumbai)</cite>
        <NavLink to="web/about/testimonials" className="button">More</NavLink>
      </footer>
    </blockquote>
  </div>
);

export default Testimonials;
