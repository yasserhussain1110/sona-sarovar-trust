import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {updatedProjectNameAndDescription, addedPicToProject} from '../../../actions';
import StatusBox from '../../../lib/components/StatusBox';
import StatusPanel from '../../../lib/components/StatusPanel';
import Modal from '../../../lib/components/Modal';
import PicForm from '../../../lib/components/PicForm';

const createInitialProjectEditPanelState = project => {
  let name = "", description = "", pics = [];
  if (project) {
    ({name, description, pics} = project);
  }

  return {
    name: name,
    description: description,
    pics: pics,
    nameError: "",
    descriptionError: "",

    statusBoxes: [],

    editingPic: false,
    deletingPic: false,
    selectedPic: null
  };
};

class ProjectEditPanel extends Component {
  constructor(props) {
    super(props);

    this.state = createInitialProjectEditPanelState(props.project);
    this.updateStateField = this.updateStateField.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.editPic = this.editPic.bind(this);
    this.deletePic = this.deletePic.bind(this);
  }

  editPic(pic) {
    this.setState({editingPic: true, selectedPic: pic});
  }

  deletePic(pic) {
    this.setState({deletingPic: true, selectedPic: pic});
  }

  clearValidation() {
    this.setState({nameError: "", descriptionError: ""});
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

    return isValid;
  }

  updateNameAndDescription() {
    let {name, description} = this.state;
    axios
      .patch(`/api/project/${this.props.project._id}`, {
        name,
        description
      }, {
        headers: {'x-auth': this.props.authToken}
      })
      .then(res => {
        this.props.updatedProjectNameAndDescription(name, description, this.props.match.params.index);
      })
      .catch(err => {
        console.log(err);
      });
  }

  uploadMorePics() {
    let pics = document.getElementById("edit-panel-pic").files;
    if (pics.length === 0) return;

    for (let i = 0; i < pics.length; i++) {
      let data = new FormData();
      data.append('pic', pics[i]);

      axios.put(`/api/project/pic/${this.props.project._id}`, data, {headers: {'x-auth': this.props.authToken}})
        .then(res => {
          this.props.addedPicToProject(res.data, this.props.match.params.index);
        })
        .catch(err => {
          console.log(err);
        });
    }

    document.getElementById("edit-panel-pic").value = null;
  }

  updateProject() {
    if (!this.validateFields()) return;

    this.updateNameAndDescription();
    this.uploadMorePics();
  }

  updateStateField(field, value) {
    let updateObj = {};
    updateObj[field] = value;
    this.setState(updateObj);
  };

  componentWillReceiveProps(nextProps) {
    this.setState(createInitialProjectEditPanelState(nextProps.project));
  }

  render() {
    return (
      <PanelView
        {...this.state}
        updateStateField={this.updateStateField}
        updateProject={this.updateProject}
        editPic={this.editPic}
        deletePic={this.deletePic}
      />

    );
  }
}

const getEditPicModal = pic => (
  <Modal show={true}>
    <PicForm
      close={1}
      authToken={1}
      mode="edit"
      picId={pic === null ? "" : pic._id}
      onSuccess={1}
    />
  </Modal>
);

const getDeletePicModal = pic => (
  <Modal show={true}>
    {`Deleting pic ${pic._id}`}
  </Modal>
);

const getModal = (editingPic, deletingPic, selectedPic) => {
  if (editingPic) {
    return getEditPicModal(selectedPic);
  } else if (deletingPic) {
    return getDeletePicModal(selectedPic);
  } else {
    return <Modal show={false}/>
  }
};


const PanelView = ({
                     name, description, pics, nameError,
                     descriptionError, updateStateField, updateProject,
                     editingPic, deletingPic, selectedPic,
                     editPic, deletePic
                   }) => (
  <div className="project-edit-panel">
    <h2>Edit Project</h2>
    <ProjectEditForm
      name={name}
      description={description}
      pics={pics}
      nameError={nameError}
      descriptionError={descriptionError}
      updateStateField={updateStateField}
      updateProject={updateProject}
      editPic={editPic}
      deletePic={deletePic}
    />
    {/*<StatusPanel>*/}
    {/*/!*{statusBoxes}*!/*/}
    {/*</StatusPanel>*/}
    {getModal(editingPic, deletingPic, selectedPic)}
  </div>
);

const ProjectEditForm = ({
                           name, description, pics, nameError,
                           descriptionError, updateStateField, updateProject,
                           editPic, deletePic
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

    <section className="current-pics">
      <h4>Project Pics</h4>
      <div className="picture-holder-wrapper">{pics.map(pic => (
        <div className="pic-holder" key={pic._id}>
          <img src={pic.url}/>
          <div className="button-holder">
            <button onClick={e => editPic(pic)}>Edit</button>
            <button onClick={e => deletePic(pic)}>Delete</button>
          </div>
        </div>))}
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
      <button onClick={updateProject}>Update</button>
    </section>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  project: state.projects.projectsDone[ownProps.match.params.index],
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedProjectNameAndDescription, addedPicToProject};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditPanel);
