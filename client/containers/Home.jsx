import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Carousal from '../components/Home/Carousal';
import MediaEventsBlog from '../components/Home/MediaEventsBlog';
import OurImpact from '../components/Home/OurImpact';
import VolunteerParallax from '../components/Home/VolunteerParallax';
import SampleTestimonial from '../components/Home/SampleTestimonial';

const Home = ({messages, imageLinks}) => (
  <div className="home">
    <Carousal messages={messages} imageLinks={imageLinks} />
    <MediaEventsBlog />
    <VolunteerParallax />
    <SampleTestimonial />
  </div>
);

const mapStateToProps = state => (
  {
    messages: state.home.captions.map(caption => caption.text),
    imageLinks: state.home.centerPics.map(picObj => picObj.url)
  }
);

Home.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageLinks: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default connect(mapStateToProps)(Home);
