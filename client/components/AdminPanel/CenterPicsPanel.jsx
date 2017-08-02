import React from 'react';
import {connect} from 'react-redux';
import PicAdder from './CenterPicsPanel/PicAdder';

const CenterPicsPanel = ({centerPics}) => (
  <div className="controller center-pics">
    <h3>Center Pics</h3>
    <div className="image-holder-wrapper">{centerPics.map((pic, index) => (
      <div key={index} className="image-holder">
        <img src={pic}/>
      </div>))}
    </div>
    <PicAdder />
  </div>
);

const mapStateToProps = state => (
  {
    centerPics: state.home.centerPics
  }
);

export default connect(mapStateToProps)(CenterPicsPanel);
