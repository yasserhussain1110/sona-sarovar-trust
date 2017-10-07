import React from 'react';
import PropTypes from 'prop-types';

const PicFieldHolder = ({pic, picError}) => (
  <div className="pic-field-holder">
    <div className="img-holder">
      <img alt="" src={pic} />
    </div>
    <div className={`error-holder ${picError ? 'shown' : 'hidden'}`}>
      <span className="error">{picError}</span>
    </div>
    <div className="updater-holder">
      <div className="label">
        <label htmlFor="pic-field-file">Change Pic</label>
      </div>
      <div className="input">
        <input id="pic-field-file" type="file" />
      </div>
    </div>
  </div>
);

PicFieldHolder.propTypes = {
  pic: PropTypes.string.isRequired,
  picError: PropTypes.string.isRequired
};

export default PicFieldHolder;
