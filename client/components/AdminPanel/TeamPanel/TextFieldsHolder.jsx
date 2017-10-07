import React from 'react';
import PropTypes from 'prop-types';
import {uniqueId} from 'lodash';

const TextFieldsHolder = ({
  name, designation, updateName, nameError,
  designationError, updateDesignation
}) => {
  const inputId = uniqueId('input');
  return (
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
          <label htmlFor={inputId}><h3>Designation</h3></label>
        </div>
        <div className="input">
          <input id={inputId} type="text" onChange={updateDesignation} value={designation} />
        </div>
        <div className={`error-holder ${designationError ? 'shown' : 'hidden'}`}>
          <span className="error">{designationError}</span>
        </div>
      </div>
    </div>
  );
};

TextFieldsHolder.propTypes = {
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
  updateDesignation: PropTypes.func.isRequired,
  nameError: PropTypes.string.isRequired,
  designationError: PropTypes.string.isRequired
};

export default TextFieldsHolder;
