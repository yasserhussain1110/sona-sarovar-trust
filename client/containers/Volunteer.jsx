import React from 'react';
import VolunteerForm from '../components/Volunteer/VolunteerForm';

const Volunteer = () => (
  <div className="volunteer">
    <h1>Volunteer with Us</h1>
    <div className="page-content">
      <div className="img-holder">
        <img alt="" src="/static/img/volunteer2.png" />
      </div>

      <div className="para-holder">
        <p>
          Our volunteers love helping people. They have made immense contribution in making
          education and health available to under-privileged children. They are our
          equal partners in this social crusade of ours. They come from varied backgrounds.
          They are young IT professionals, students, housewives or senior citizens.
          They are higly motivated and dynamic people and we welcome their many contributions.
        </p>

        <p>
          You can aid our cause and positively impact a child&apos;s life too.
          Please fill the form below and we will get back to you.
          Thank you for your interest!
        </p>
      </div>

      <div className="form-holder">
        <VolunteerForm />
      </div>

    </div>
  </div>
);

export default Volunteer;
