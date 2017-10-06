import React from 'react';
import {connect} from 'react-redux';
import marked from 'marked';

const VisionAndMission = ({vision, mission}) => (
  <div className="vision">
    <h1>Vision and Mission</h1>
    <div className="page-content">
      <div className="section-content">
        <h2>Vision</h2>
        <div dangerouslySetInnerHTML={{__html: marked(vision)}} className="paras"/>
      </div>

      <div className="section-content">
        <h2>Mission</h2>
        <div dangerouslySetInnerHTML={{__html: marked(mission)}} className="paras"/>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  vision: state.aboutUs.vision,
  mission: state.aboutUs.mission
});

export default connect(mapStateToProps)(VisionAndMission);
