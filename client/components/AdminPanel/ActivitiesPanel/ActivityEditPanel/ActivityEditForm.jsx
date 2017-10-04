import React from 'react';
import PropTypes from 'prop-types';

const ActivityEditForm = ({
                           name, description, pics, nameError,
                           descriptionError, updateStateField, updateActivity,
                           updatePic, deletePic
                         }) => (
  <div className="form-holder">
    <section className="name">
      <div className="field">
        <div className="label">
          <label>Name</label>
        </div>

        <div className="input">
          <input type="text" value={name} onChange={e => updateStateField('name', e.target.value)}/>
        </div>
      </div>

      <div className={`field-error ${nameError ? 'show-field-error' : ''}`}>
        {nameError}
      </div>
    </section>

    <section className="description">
      <div className="field">
        <div className="label">
          <label>Description</label>
        </div>

        <div className="input">
          <textarea value={description} onChange={e => updateStateField('description', e.target.value)}/>
        </div>
      </div>

      <div className={`field-error ${descriptionError ? 'show-field-error' : ''}`}>
        {descriptionError}
      </div>
    </section>

    <section className="current-pics">
      <div className="current-pics-content">
        <div className="label">
          <h4>Activity Pics</h4>
        </div>
        <div className="picture-holder-wrapper">{pics.map(pic => (
          <div className="pic-holder" key={pic._id}>
            <img src={pic.url}/>
            <div className="button-holder">
              <button className="update-button" onClick={e => updatePic(pic)}>Update</button>
              <button className="delete-button" onClick={e => deletePic(pic)}>Delete</button>
            </div>
          </div>))}
        </div>
      </div>
    </section>

    <section className="pics">
      <div className="field">
        <div className="label">
          <label>Add new Pictures</label>
        </div>

        <div className="input">
          <input id="edit-panel-pic" type="file" multiple/>
        </div>
      </div>
    </section>

    <section className="button-holder">
      <button onClick={updateActivity}>Update</button>
    </section>
  </div>
);

ActivityEditForm.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pics: PropTypes.array.isRequired,
  nameError: PropTypes.string.isRequired,
  descriptionError: PropTypes.string.isRequired,
  updateStateField: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired,
  updatePic: PropTypes.func.isRequired,
  deletePic: PropTypes.func.isRequired
};

export default ActivityEditForm;
