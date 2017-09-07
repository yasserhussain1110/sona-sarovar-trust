import React from 'react';

const PicFieldHolder = ({pic}) => (
  <div className="pic-field-holder">
    <div className="img-holder">
      <img src={pic}/>
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
