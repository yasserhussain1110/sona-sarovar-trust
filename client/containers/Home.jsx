import React from 'react';
import Carousal from '../components/Home/Carousal';

const details = [
  "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.",
  "This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide."
];

const Home = () => (
  <div className="home">
    <Carousal />

    <div className="info">
      <div className="short-bio">
        <h3>Sona Sarovar Trust</h3>
        <div className="details">
          <p>{details[0]}</p>
          <p>{details[1]}</p>
        </div>
      </div>

      <div className="more-links">
        <div className="link">
          <div className="img-container">
            <img src="/static/donate.png"/>
          </div>
          <div className="link-button">DONATE</div>
          <div className="link-details">I'm a paragraph. Click here to add your own text and edit me. I’m a great place
            for you to tell a story and let your users know a little more about you.​
          </div>
        </div>

        <div className="link">
          <div className="img-container">
            <img src="/static/involve.png"/>
          </div>
          <div className="link-button">GET INVOLVED</div>
          <div className="link-details">I'm a paragraph. Click here to add your own text and edit me. I’m a great place
            for you to tell a story and let your users know a little more about you.​
          </div>
        </div>

        <div className="link">
          <div className="img-container">
            <img src="/static/mission.png"/>
          </div>
          <div className="link-button">OUR MISSION</div>
          <div className="link-details">I'm a paragraph. Click here to add your own text and edit me. I’m a great place
            for you to tell a story and let your users know a little more about you.​
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
