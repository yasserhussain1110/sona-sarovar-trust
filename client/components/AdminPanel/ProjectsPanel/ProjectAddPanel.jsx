import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addedProjectDone} from '../../../actions';
import StatusBox from '../../../lib/components/StatusBox';
import StatusPanel from '../../../lib/components/StatusPanel';

const createInitialProjectAddPanelState = () => ({
  name: "",
  description: "",
  nameError: "",
  descriptionError: "",
  picsError: "",

  statusBoxes: []
});

class ProjectAddPanel extends Component {
  constructor(props) {
    super(props);

    this.state = createInitialProjectAddPanelState();

    this.updateStateField = this.updateStateField.bind(this);
    this.addProject = this.addProject.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  // componentDidMount() {
  //   this.addSuccessStatusBox([]);
  //   this.addFailureStatusBox();
  // }

  resetForm() {
    this.setState(createInitialProjectAddPanelState());
    document.getElementById("add-panel-pic").value = null;
  }

  clearValidation() {
    this.setState({nameError: "", descriptionError: "", picsError: ""});
  }

  validateFields() {
    let {name, description} = this.state;
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

    let pics = document.getElementById("add-panel-pic").files;
    if (pics.length === 0) {
      this.setState({picsError: "Pics field cannot be empty"});
      isValid = false;
    }

    return isValid;
  }

  addSuccessStatusBox(nonPicFileNames) {
    this.setState(prevState => {
      let statusBoxes = prevState.statusBoxes.slice();
      statusBoxes.push(<SuccessStatus
        key={prevState.statusBoxes.length}
        resetForm={this.resetForm}
        nonPicFileNames={nonPicFileNames}/>);
      return {statusBoxes};
    });
  }

  addFailureStatusBox() {
    this.setState(prevState => {
      let statusBoxes = prevState.statusBoxes.slice();
      statusBoxes.push(<FailureStatus key={prevState.statusBoxes.length} resetForm={this.resetForm}/>);
      return {statusBoxes};
    });
  }

  addProject() {
    if (!this.validateFields()) return;

    let {name, description} = this.state;
    let pics = document.getElementById("add-panel-pic").files;

    let data = new FormData();
    data.append('name', name);
    data.append('description', description);
    for (let i = 0; i < pics.length; i++) {
      data.append('pics', pics[i]);
    }
    axios.put('/api/project', data, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        let {nonPicFileNames, project} = res.data;
        this.resetForm();
        this.addSuccessStatusBox(nonPicFileNames);
        this.props.addedProjectDone(project);
      })
      .catch(err => {
        console.log(err);
        this.addFailureStatusBox();
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

const FailureStatus = ({resetForm}) => (
  <StatusBox success={false}>
    <div><h3>Failure!</h3></div>
    <div><p>Could Not Create New Project.</p></div>
    <div><span><a onClick={resetForm}><strong>Try Again</strong></a></span></div>
  </StatusBox>
);

const SuccessStatus = ({resetForm, nonPicFileNames}) => {
  return (
    <StatusBox success={true}>
      <div><h3>Success!</h3></div>
      <div><p>New Project Created Successfully.</p></div>
      <div className={`non-saved-files ${nonPicFileNames.length > 0 ? "show-non-saved-files" : ""}`}>
        <p>However these files could not be saved as they are not pictures.</p>
        <ol>{nonPicFileNames.map((fileName, index) => (
          <li key={index}>{fileName}</li>))}
        </ol>
      </div>
      <div>
        <span>
          <p>
          <Link to="/admin/projects"><strong>Redirect</strong></Link>{" to Project List or "}
            <a onClick={resetForm}><strong>Add</strong></a> a new project.
          </p>
        </span>
      </div>
    </StatusBox>
  );
};

const PanelView = ({
                     name, description, nameError, descriptionError,
                     picsError, updateStateField, addProject, statusBoxes
                   }) => (
  <div className="project-add-panel">
    <h2>Add a project</h2>
    <ProjectAddForm
      name={name}
      description={description}
      nameError={nameError}
      descriptionError={descriptionError}
      picsError={picsError}
      updateStateField={updateStateField}
      addProject={addProject}
    />

    <StatusPanel>
      {statusBoxes}
    </StatusPanel>
  </div>
);

const ProjectAddForm = ({
                          name, description, nameError, descriptionError,
                          picsError, updateStateField, addProject
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
          <input id="add-panel-pic" type="file" multiple/>
        </div>
      </div>

      <div className={`field-error ${picsError ? "show-field-error" : ""}`}>
        {picsError}
      </div>
    </section>

    <section className="button-holder">
      <button onClick={addProject}>Add</button>
    </section>
  </div>
);

const mapStateToProps = state => (
  {
    authToken: state.userAuth.authToken
  }
);

const mapDispatchToProps = {addedProjectDone};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAddPanel);
