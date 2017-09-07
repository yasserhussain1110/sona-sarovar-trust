import React from 'react';

const TextFieldsHolder = ({name, info, updateName, updateInfo, nameError, infoError}) => (
  <div className="text-fields-holder">
    <div className="field">
      <div className="label">
        <label>Name</label>
      </div>
      <div className="input">
        <input type="text" onChange={updateName} value={name}/>
        <span className={`error ${nameError ? "shown" : "hidden"}`}>{nameError}</span>
      </div>
    </div>

    <div className="field">
      <div className="label">
        <label>Info</label>
      </div>
      <div className="input">
        <input type="text" onChange={updateInfo} value={info}/>
        <span className={`error ${infoError ? "shown" : "hidden"}`}>{infoError}</span>
      </div>
    </div>
  </div>
);

export default TextFieldsHolder;
