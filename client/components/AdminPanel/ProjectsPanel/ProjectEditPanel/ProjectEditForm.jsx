import React from 'react';
import PropTypes from 'prop-types';

const ProjectEditForm = ({
  name, description, pics, nameError,
  descriptionError, updateStateField, updateProject,
  updatePic, deletePic
}) => (
  <div className="form-holder">
    <section className="name">
      <div className="field">
        <div className="label">
          <label htmlFor="project-edit-name">Name</label>
        </div>

        <div className="input">
          <input
            id="project-edit-name"
            type="text"
            value={name}
            onChange={e => updateStateField('name', e.target.value)}
          />
        </div>
      </div>

      <div className={`field-error ${nameError ? 'show-field-error' : ''}`}>
        {nameError}
      </div>
    </section>

    <section className="description">
      <div className="field">
        <div className="label">
          <label htmlFor="project-edit-description">Description</label>
        </div>

        <div className="input">
          <textarea
            id="project-edit-description"
            value={description}
            onChange={e => updateStateField('description', e.target.value)}
          />
        </div>
      </div>

      <div className={`field-error ${descriptionError ? 'show-field-error' : ''}`}>
        {descriptionError}
      </div>
    </section>

    <section className="current-pics">
      <div className="current-pics-content">
        <div className="label">
          <h4>Project Pics</h4>
        </div>
        <div className="picture-holder-wrapper">{pics.map(pic => (
          <div className="pic-holder" key={pic._id}>
            <img alt="" src={pic.url} />
            <div className="button-holder">
              <button className="update-button" onClick={() => updatePic(pic)}>Update</button>
              <button className="delete-button" onClick={() => deletePic(pic)}>Delete</button>
            </div>
          </div>))}
        </div>
      </div>
    </section>

    <section className="pics">
      <div className="field">
        <div className="label">
          <label htmlFor="edit-panel-pic">Add new Pictures</label>
        </div>

        <div className="input">
          <input id="edit-panel-pic" type="file" multiple />
        </div>
      </div>
    </section>

    <section className="button-holder">
      <button onClick={updateProject}>Update</button>
    </section>
  </div>
);

ProjectEditForm.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pics: PropTypes.array.isRequired,
  nameError: PropTypes.string.isRequired,
  descriptionError: PropTypes.string.isRequired,
  updateStateField: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  updatePic: PropTypes.func.isRequired,
  deletePic: PropTypes.func.isRequired
};

export default ProjectEditForm;
