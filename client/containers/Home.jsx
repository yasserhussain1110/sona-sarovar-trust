import React from 'react';
import Carousal from '../components/Home/Carousal';
import MediaEventsBlog from '../components/Home/MediaEventsBlog';
import OurImpact from '../components/Home/OurImpact';
import VolunteerParallax from '../components/Home/VolunteerParallax';
import Testimonials from '../components/Home/Testimonials';
import {connect} from 'react-redux';

const Home = ({mainTextPara1, mainTextPara2, messages, imageLinks}) => (
  <div className="home">
    <Carousal messages={messages} imageLinks={imageLinks}/>
    <MediaEventsBlog />
    <OurImpact />
    <VolunteerParallax />
    <Testimonials />
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

export default connect(mapStateToProps)(Home);
