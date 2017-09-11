import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clip} from '../../../lib/helpers/functions';
import Modal from '../../../lib/components/Modal';
import axios from 'axios';
import {deletedProjectDone} from '../../../actions';
import StatusBox from '../../../lib/components/StatusBox';
import StatusPanel from '../../../lib/components/StatusPanel';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';

class ProjectListPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingModal: false,
      selectedProjectIndex: -1,
      statusBoxToAdd: null
    };

    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  addStatusBox(statusBox) {
    this.setState({statusBoxToAdd: statusBox});
  }

  deleteProject() {
    axios.delete(`/api/project/${this.props.projects[this.state.selectedProjectIndex]._id}`, {
      headers: {'x-auth': this.props.authToken}
    }).then(() => {
      this.closeDeleteModal();
      this.props.deletedProjectDone(this.state.selectedProjectIndex);
      this.addStatusBox(
        <StatusBox success={true}>
          <div><h3>Success!</h3></div>
          <div><span>Project deleted successfully.</span></div>
        </StatusBox>
      );
    }).catch(err => {
      handleCommonErrors(err);
      this.addStatusBox(
        <StatusBox success={false}>
          <div><h3>Failure!</h3></div>
          <div><span>Project could not be deleted.</span></div>
        </StatusBox>
      );
      console.log(err);
    });
  }

  closeDeleteModal() {
    this.setState({showingModal: false});
  }

  showDeleteModal(index) {
    this.setState({showingModal: true, selectedProjectIndex: index});
  }

  getModalContent() {
    let selectedProject = this.props.projects[this.state.selectedProjectIndex];

    return this.state.showingModal ? (
      <DeleteProjectForm
        deleteProject={this.deleteProject}
        closeDeleteModal={this.closeDeleteModal}
        selectedProject={selectedProject}
      />
    ) : null;
  }

  render() {
    return (
      <ProjectListPanelView
        projects={this.props.projects}
        modalContent={this.getModalContent()}
        showingModal={this.state.showingModal}
        statusBoxToAdd={this.state.statusBoxToAdd}
        showDeleteModal={this.showDeleteModal}
      />
    );
  }
}

const ProjectListPanelView = ({projects, modalContent, showingModal, showDeleteModal, statusBoxToAdd}) => (
  <div className="project-list-panel">
    <div className="add-project-wrapper">
      <h2>Add a project</h2>
      <div className="link-holder">
        <Link className="success-button" to="/admin/projects/add">Add a New Project</Link>
      </div>
    </div>

    <div className="list-project-wrapper">
      <h2>List of projects</h2>
      <div className="project-list-container">
        <ul className="project-list">{projects.map((project, index) => (
          <li key={index} className="project">
            <div className="sl">#{index + 1}</div>
            <div className="img-holder">
              <img src={project.pics[0].url}/>
            </div>
            <div className="name">{project.name}</div>
            <div className="description">{clip(project.description, 40)}</div>
            <div className="button-holder">
              <button className="edit-button">
                <Link to={`/admin/projects/edit/${index}`}>Edit</Link>
              </button>
              <button onClick={() => showDeleteModal(index)} className="delete-button">Delete</button>
            </div>
          </li>))}
        </ul>
      </div>
    </div>
    <Modal show={showingModal}>
      {modalContent}
    </Modal>
    <StatusPanel statusBoxToAdd={statusBoxToAdd}/>
  </div>
);

const DeleteProjectForm = ({selectedProject, closeDeleteModal, deleteProject}) => (
  <div className="delete-project-form">
    <p>Are you sure you want do delete project <strong>{selectedProject.name}</strong>?</p>
    <div className="button-holder">
      <button onClick={deleteProject}>Yes</button>
      <button onClick={closeDeleteModal}>No</button>
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    projects: state.projects.projectsDone,
    authToken: state.userAuth.authToken
  }
);

const mapDispatchToProps = {deletedProjectDone};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPanel);
