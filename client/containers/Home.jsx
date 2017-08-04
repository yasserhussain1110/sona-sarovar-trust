import React from 'react';
import Carousal from '../components/Home/Carousal';
import {connect} from 'react-redux';

const Home = ({mainTexts, messages, imageLinks}) => (
  <div className="home">
    <Carousal messages={messages} imageLinks={imageLinks}/>

    <div className="info">
      <div className="short-bio">
        <h3>Sona Sarovar Trust</h3>
        <div className="details">
          <p>{mainTexts[0]}</p>
          <p>{mainTexts[1]}</p>
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

const mapStateToProps = state => (
  {
    mainTexts: state.home.mainTexts,
    messages: state.home.captions.map(caption => caption.text),
    imageLinks: state.home.centerPics.map(picObj => picObj.url)
  }
);

export default connect(mapStateToProps)(Home);
