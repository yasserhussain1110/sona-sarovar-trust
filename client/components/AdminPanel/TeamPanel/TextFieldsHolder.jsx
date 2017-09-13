import React from 'react';

const TextFieldsHolder = ({name, info, updateName, updateInfo, nameError, infoError}) => (
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
        <label><h3>Info</h3></label>
      </div>
      <div className="input">
        <input type="text" onChange={updateInfo} value={info}/>
      </div>
      <div className={`error-holder ${infoError ? "shown" : "hidden"}`}>
        <span className="error">{infoError}</span>
      </div>
    </div>
  </div>
);

export default TextFieldsHolder;
