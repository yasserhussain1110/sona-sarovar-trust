import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Carousal from '../components/Home/Carousal';
import MediaEventsBlog from '../components/Home/MediaEventsBlog';
import VolunteerParallax from '../components/Home/VolunteerParallax';
import SampleTestimonial from '../components/Home/SampleTestimonial';

const Home = ({messages, imageLinks}) => (
  <div className="home">
    <Carousal messages={messages} imageLinks={imageLinks} />
    <MediaEventsBlog />
    <VolunteerParallax />
    <SampleTestimonial />
    <div>
      <div>Registration No.E 24045(Mum) dated 21.03.2007</div>
      <div>PAN No:AAGTS9733A</div>
      <div>80 G Certificate,:Order No DIT(E)/MC/80 G/2095/2009-10 Dated 21.07.2009</div>
      <div>Guide Star India,:GSN 4724</div>
      <div>Bridge No,:7883195158</div>
      <div>Darpan (NITI Aayog,Govt. of India ) Unique ID :MH/2015/0089498</div>
    </div>
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
