import React from 'react';

const TextFieldsHolder = ({
                            name, info, designation, updateName, nameError,
                            infoError, designationError, updateDesignation,
                            useMarkdownHelper
                          }) => (
  <div className="text-fields-holder">
    <div className="field">
      <div className="label">
        <label><h3>Name</h3></label>
      </div>
      <div className="input">
        <input type="text" onChange={updateName} value={name}/>
      </div>
      <div className={`error-holder ${nameError ? "shown" : "hidden"}`}>
        <span className="error">{nameError}</span>
      </div>
    </div>

    <div className="field">
      <div className="label">
        <label><h3>Designation</h3></label>
      </div>
      <div className="input">
        <input type="text" onChange={updateDesignation} value={designation}/>
      </div>
      <div className={`error-holder ${designationError ? "shown" : "hidden"}`}>
        <span className="error">{designationError}</span>
      </div>
    </div>
  </div>
);

export default TextFieldsHolder;
