import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Carousal from '../components/Home/Carousal';

const Home = ({mainTextPara1, mainTextPara2, messages, imageLinks}) => (
  <div className="home">
    <Carousal messages={messages} imageLinks={imageLinks} />

    <div className="info">
      <div className="short-bio">
        <h3>Sona Sarovar Trust</h3>
        <div className="details">
          <p>{mainTextPara1}</p>
          <p>{mainTextPara2}</p>
        </div>
      </div>

      <div className="more-links">
        <div className="link">
          <div className="img-container">
            <img alt="" src="/static/donate.png" />
          </div>
          <div className="link-button">DONATE</div>
          <div className="link-details">
            I&quot;m a paragraph. Click here to add your own text and edit me. I’m a great place
            for you to tell a story and let your users know a little more about you.
          </div>
        </div>

        <div className="link">
          <div className="img-container">
            <img alt="" src="/static/involve.png" />
          </div>
          <div className="link-button">GET INVOLVED</div>
          <div className="link-details">
            I&quot;m a paragraph. Click here to add your own text and edit me. I’m a great place
            for you to tell a story and let your users know a little more about you.
          </div>
        </div>

        <div className="link">
          <div className="img-container">
            <img alt="" src="/static/mission.png" />
          </div>
          <div className="link-button">OUR MISSION</div>
          <div className="link-details">
            I&quot;m a paragraph. Click here to add your own text and edit me. I’m a great place
            for you to tell a story and let your users know a little more about you.
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    mainTextPara1: state.home.mainTextPara1,
    mainTextPara2: state.home.mainTextPara2,
    messages: state.home.captions.map(caption => caption.text),
    imageLinks: state.home.centerPics.map(picObj => picObj.url)
  }
);

Home.propTypes = {
  mainTextPara1: PropTypes.string.isRequired,
  mainTextPara2: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageLinks: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default connect(mapStateToProps)(Home);
