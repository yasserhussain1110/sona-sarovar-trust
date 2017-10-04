import React from 'react';

const PicFieldHolder = ({pic, picError}) => (
  <div className="pic-field-holder">
    <div className="img-holder">
      <img src={pic}/>
    </div>
    <div className={`error-holder ${picError ? 'shown' : 'hidden'}`}>
      <span className="error">{picError}</span>
    </div>
    <div className="updater-holder">
      <div className="label">
        <label>Change Pic</label>
      </div>
      <div className="input">
        <input type="file"/>
      </div>
    </div>
  </div>
);

export default PicFieldHolder;
