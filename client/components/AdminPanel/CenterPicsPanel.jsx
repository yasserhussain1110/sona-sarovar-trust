import React from 'react';
import {connect} from 'react-redux';
import PicAdder from './CenterPicsPanel/PicAdder';

const CenterPicsPanel = ({centerPics, authToken}) => (
  <div className="controller center-pics">
    <h3>Center Pics</h3>
    <div className="image-holder-wrapper">{centerPics.map(({_id, url}) => (
      <div key={_id} className="image-holder">
        <img src={url}/>
      </div>))}
    </div>
    <PicAdder authToken={authToken}/>
  </div>
);

const mapStateToProps = state => (
  {
    centerPics: state.home.centerPics,
    authToken: state.userAuth.authToken
  }
);

export default connect(mapStateToProps)(CenterPicsPanel);
