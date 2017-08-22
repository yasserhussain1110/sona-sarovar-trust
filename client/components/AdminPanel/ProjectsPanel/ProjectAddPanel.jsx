import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const createInitialProjectAddPanelState = () => ({
  name: "",
  description: "",
  pics: null,
  nameError: "",
  descriptionError: "",
  picsError: "",

  madeRequest: false,
  projectAdded: false,
  nonPicFileNames: []
});

class ProjectAddPanel extends Component {
  constructor(props) {
    super(props);

    this.state = createInitialProjectAddPanelState();

    this.updateStateField = this.updateStateField.bind(this);
    this.addProject = this.addProject.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm(e) {
    e.preventDefault();
    this.setState(createInitialProjectAddPanelState());
    document.getElementById("project-add").value = null;
  }

  clearValidation() {
    this.setState({nameError: "", descriptionError: "", picsError: ""});
  }

  validateFields() {
    let {name, description, pics} = this.state;
    this.clearValidation();

    let isValid = true;

    if (!name) {
      this.setState({nameError: "Name field cannot be empty"});
      isValid = false;
    }

    if (!description) {
      this.setState({descriptionError: "Description field cannot be empty"});
      isValid = false;
    }

    if (!pics) {
      this.setState({picsError: "Pics field cannot be empty"});
      isValid = false;
    }

    return isValid;
  }

  addProject() {
    if (!this.validateFields()) return;

    let {name, description, pics} = this.state;
    let data = new FormData();
    data.append('name', name);
    data.append('description', description);
    for (let i = 0; i < this.state.pics.length; i++) {
      data.append('pics', pics[i]);
    }
    axios.put('/api/project', data, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        let {nonPicFileNames} = res.data;
        this.setState({madeRequest: true, nonPicFileNames, projectAdded: true});
      })
      .catch(err => {
        console.log(err);
        this.setState({madeRequest: true});
      });
  }

  updateStateField(field, value) {
    let updateObj = {};
    updateObj[field] = value;
    this.setState(updateObj);
  }

  render() {
    return (
      <PanelView
        {...this.state}
        updateStateField={this.updateStateField}
        addProject={this.addProject}
        resetForm={this.resetForm}
      />
    );
  }
}

const PanelView = ({
  name, description, nameError,
  descriptionError, picsError, madeRequest,
  projectAdded, nonPicFileNames, updateStateField,
  addProject, resetForm
}) => (
  <div className="project-add-panel">
    <h2>Add a project</h2>
    <AddProjectForm
      name={name}
      description={description}
      nameError={nameError}
      descriptionError={descriptionError}
      picsError={picsError}
      madeRequest={madeRequest}
      updateStateField={updateStateField}
      addProject={addProject}
    />
    <StatusBox
      madeRequest={madeRequest}
      projectAdded={projectAdded}
      nonPicFileNames={nonPicFileNames}
      resetForm={resetForm}
    />
  </div>
);

const AddProjectForm = ({
  name, description, nameError,
  descriptionError, picsError,
  madeRequest, updateStateField, addProject
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

      <div className={`field-error ${nameError ? "show-field-error" : ""}`}>
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

      <div className={`field-error ${descriptionError ? "show-field-error" : ""}`}>
        {descriptionError}
      </div>
    </section>

    <section className="pics">
      <div className="field">
        <div className="label">
          <label>Pictures</label>
        </div>

        <div className="input">
          <input id="project-add" type="file" multiple onChange={e => updateStateField('pics', e.target.files)}/>
        </div>
      </div>

      <div className={`field-error ${picsError ? "show-field-error" : ""}`}>
        {picsError}
      </div>
    </section>

    <section className="button-holder">
      <button onClick={addProject} disabled={madeRequest}>Add</button>
    </section>
  </div>
);

const StatusBox = ({madeRequest, projectAdded, nonPicFileNames, resetForm}) => (
  <div className={`status-holder ${madeRequest ? "show-status-holder" : ""}`}>
    <div className={`success-status ${projectAdded ? "show-success-status" : ""}`}>
      <h3>Success!</h3>
      <p>New Project Created Successfully.</p>
      <div className={`non-saved-files ${nonPicFileNames.length > 0 ? "show-non-saved-files" : ""}`}>
        <p>However these files could not be saved as they are not pictures.</p>
        <ul>{nonPicFileNames.map((fileName, index) => (
          <li key={index}>{fileName}</li>))}
        </ul>
      </div>
      <span>
      <p>
        <Link to="/admin/projects"><strong>Redirect</strong></Link>{" to Project List or "}
        <a onClick={resetForm}><strong>Add</strong></a> a new project.
      </p>
    </span>
    </div>

    <div className={`failure-status ${projectAdded ? "" : "show-failure-status"}`}>
      <h3>Failure!</h3>
      <Link to="/admin/projects/add"><strong>Try Again</strong></Link>.
    </div>
  </div>

);


const mapStateToProps = state => (
  {
    authToken: state.userAuth.authToken
  }
);

export default connect(mapStateToProps)(ProjectAddPanel);
