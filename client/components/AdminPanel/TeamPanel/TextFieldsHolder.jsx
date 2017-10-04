import React from 'react';
import PropTypes from 'prop-types';

const TextFieldsHolder = ({name, info, updateName, updateInfo, nameError, infoError}) => (
  <div className="text-fields-holder">
    <div className="field">
      <div className="label">
        <label htmlFor="text-field-name"><h3>Name</h3></label>
      </div>
      <div className="input">
        <input id="text-field-name" type="text" onChange={updateName} value={name} />
      </div>
      <div className={`error-holder ${nameError ? 'shown' : 'hidden'}`}>
        <span className="error">{nameError}</span>
      </div>
    </div>

    <div className="field">
      <div className="label">
        <label htmlFor="text-field-info"><h3>Info</h3></label>
      </div>
      <div className="input">
        <input id="text-field-info" type="text" onChange={updateInfo} value={info} />
      </div>
      <div className={`error-holder ${infoError ? 'shown' : 'hidden'}`}>
        <span className="error">{infoError}</span>
      </div>
    </div>
  </div>
);

TextFieldsHolder.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
  updateInfo: PropTypes.func.isRequired,
  nameError: PropTypes.string.isRequired,
  infoError: PropTypes.string.isRequired
};

export default TextFieldsHolder;
