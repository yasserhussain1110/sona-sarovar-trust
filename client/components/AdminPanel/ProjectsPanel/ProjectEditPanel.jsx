import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  updatedProjectNameAndDescription, addedPicToProject,
  updatedProjectPic, deletedPicFromProject
}  from '../../../actions';
import StatusBox from '../../../lib/components/StatusBox';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';
import ProjectEditPanelView from './ProjectEditPanel/ProjectEditPanelView';

const createStateFromProjectProp = project => {
  let name = '';
  let description = '';
  let pics = [];
  if (project) {
    ({name, description, pics} = project);
  }
  return {name, description, pics};
};

const createUXState = () => ({
  nameError: '',
  descriptionError: '',
  updatingPic: false,
  deletingPic: false,
  selectedPic: null
});

const createInitState = props => ({
  ...createStateFromProjectProp(props.project),
  ...createUXState(),
  statusBoxToAdd: null
});

class ProjectEditPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...createInitState(props)
    };

    this.updateStateField = this.updateStateField.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.updatePic = this.updatePic.bind(this);
    this.deletePic = this.deletePic.bind(this);
    this.updatedProjectPic = this.updatedProjectPic.bind(this);
    this.updateProjectPicFailed = this.updateProjectPicFailed.bind(this);
    this.deletedProjectPic = this.deletedProjectPic.bind(this);
    this.deleteProjectPicFailed = this.deleteProjectPicFailed.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(createStateFromProjectProp(nextProps.project));
  }

  closeModal() {
    this.setState({updatingPic: false, deletingPic: false});
  }

  deleteProjectPicFailed() {
    this.closeModal();
    this.addStatusBox(
      <StatusBox success={false}>
        <div><h3>Failure!</h3></div>
        <div><span>Project pic could not be deleted.</span></div>
      </StatusBox>
    );
  }

  deletedProjectPic() {
    this.closeModal();
    this.props.deletedPicFromProject(this.state.selectedPic, Number(this.props.match.params.index));
    this.addStatusBox(
      <StatusBox success>
        <div><h3>Success!</h3></div>
        <div><span>Deleted Project pic Successfully</span></div>
      </StatusBox>
    );
  }

  updateProjectPicFailed() {
    this.setState({updatingPic: false, deletingPic: false});
    this.addStatusBox(
      <StatusBox success={false}>
        <div><h3>Failure!</h3></div>
        <div>Project Pic could not be updated.</div>
      </StatusBox>
    );
  }

  updatedProjectPic({url}) {
    this.props.updatedProjectPic(Number(this.props.match.params.index), this.state.selectedPic._id, url);
    this.setState({updatingPic: false, deletingPic: false});
    this.addStatusBox(
      <StatusBox success>
        <div><h3>Success!</h3></div>
        <div>Project Pic Updated Successfully.</div>
      </StatusBox>
    );
  }

  addStatusBox(statusBox) {
    this.setState({statusBoxToAdd: statusBox});
  }

  updatePic(pic) {
    this.setState({updatingPic: true, selectedPic: pic});
  }

  deletePic(pic) {
    this.setState({deletingPic: true, selectedPic: pic});
  }

  clearValidation() {
    this.setState({nameError: '', descriptionError: ''});
  }

  validateFields() {
    const {name, description} = this.state;
    this.clearValidation();

    let isValid = true;

    if (!name) {
      this.setState({nameError: 'Name field cannot be empty'});
      isValid = false;
    }

    if (!description) {
      this.setState({descriptionError: 'Description field cannot be empty'});
      isValid = false;
    }

    return isValid;
  }

  updateNameAndDescription() {
    const {name, description} = this.state;
    axios.patch(`/api/project/${this.props.project._id}`, {name, description}, {
      headers: {'x-auth': this.props.authToken}
    })
      .then(() => {
        this.props.updatedProjectNameAndDescription(
          name, description, Number(this.props.match.params.index)
        );
        this.addStatusBox(
          <StatusBox success>
            <div><h3>Success!</h3></div>
            <div>Updated Project Name and Description.</div>
          </StatusBox>
        );
      })
      .catch(err => {
        console.log(err);
        handleCommonErrors(err);
        this.addStatusBox(
          <StatusBox success={false}>
            <div><h3>Failure!</h3></div>
            <div>Project Name and Description updation failed.</div>
          </StatusBox>
        );
      });
  }

  uploadMorePics() {
    const pics = document.getElementById('edit-panel-pic').files;
    if (pics.length === 0) return;

    const uploadPicPromises = Object.keys(pics).map(key => {
      const pic = pics[key];
      const data = new FormData();
      data.append('pic', pic);

      return axios.put(`/api/project/pic/${this.props.project._id}`, data, {headers: {'x-auth': this.props.authToken}})
        .then(res => {
          this.props.addedPicToProject(res.data, Number(this.props.match.params.index));
          this.addStatusBox(
            <StatusBox success>
              <div><h3>Success!</h3></div>
              <div>{pic.name} added to Project successfully.</div>
            </StatusBox>
          );
        })
        .catch(err => {
          console.log(err);
          this.addStatusBox(
            <StatusBox success={false}>
              <div><h3>Failure!</h3></div>
              <div>Adding pic {pic.name} to project failed.</div>
            </StatusBox>
          );
        });
    });

    Promise.all(uploadPicPromises).then(() => {
      document.getElementById('edit-panel-pic').value = null;
    });
  }

  updateProject() {
    if (!this.validateFields()) return;

    this.updateNameAndDescription();
    this.uploadMorePics();
  }

  updateStateField(field, value) {
    const updateObj = {};
    updateObj[field] = value;
    this.setState(updateObj);
  }

  render() {
    return (
      <ProjectEditPanelView
        {...this.state}
        updateStateField={this.updateStateField}
        updateProject={this.updateProject}
        updatePic={this.updatePic}
        deletePic={this.deletePic}
        closeModal={this.closeModal}
        authToken={this.props.authToken}
        updatedProjectPic={this.updatedProjectPic}
        updateProjectPicFailed={this.updateProjectPicFailed}
        deletedProjectPic={this.deletedProjectPic}
        deleteProjectPicFailed={this.deleteProjectPicFailed}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  project: state.projects.projectsDone[ownProps.match.params.index],
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {
  updatedProjectNameAndDescription,
  addedPicToProject,
  updatedProjectPic,
  deletedPicFromProject
};

ProjectEditPanel.defaultProps = {
  project: null
};

ProjectEditPanel.propTypes = {
  deletedPicFromProject: PropTypes.func.isRequired,
  updatedProjectPic: PropTypes.func.isRequired,
  updatedProjectNameAndDescription: PropTypes.func.isRequired,
  addedPicToProject: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  authToken: PropTypes.string.isRequired,
  project: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditPanel);
