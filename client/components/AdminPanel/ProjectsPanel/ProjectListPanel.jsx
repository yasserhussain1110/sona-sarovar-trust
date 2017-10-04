import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {clip} from '../../../lib/helpers/functions';
import Modal from '../../../lib/components/Modal';
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

  getModalContent() {
    const selectedProject = this.props.projects[this.state.selectedProjectIndex];

    return this.state.showingModal ? (
      <DeleteProjectForm
        deleteProject={this.deleteProject}
        closeDeleteModal={this.closeDeleteModal}
        selectedProject={selectedProject}
      />
    ) : null;
  }

  showDeleteModal(index) {
    this.setState({showingModal: true, selectedProjectIndex: index});
  }

  closeDeleteModal() {
    this.setState({showingModal: false});
  }

  deleteProject() {
    const project = this.props.projects[this.state.selectedProjectIndex];
    axios.delete(`/api/project/${project._id}`, {
      headers: {'x-auth': this.props.authToken}
    }).then(() => {
      this.closeDeleteModal();
      this.props.deletedProjectDone(this.state.selectedProjectIndex);
      this.addStatusBox(
        <StatusBox success>
          <div><h3>Success!</h3></div>
          <div><span>Project <strong>{project.name}</strong> deleted successfully.</span></div>
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

  addStatusBox(statusBox) {
    this.setState({statusBoxToAdd: statusBox});
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

const ProjectListPanelView =
  ({projects, modalContent, showingModal, showDeleteModal, statusBoxToAdd}) => (
    <div className="project-list-panel">
      <div className="add-project-wrapper">
        <h2>Add a Project</h2>
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
                <img alt="" src={project.pics[0].url} />
              </div>
              <div className="name">{project.name}</div>
              <div className="description">{clip(project.description, 40)}</div>
              <div className="button-holder">
                <button className="edit-button">
                  <Link to={`/admin/projects/edit/${index}`}>Edit</Link>
                </button>
                <button
                  onClick={() => showDeleteModal(index)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>))}
          </ul>
        </div>
      </div>
      <Modal show={showingModal}>
        {modalContent}
      </Modal>
      <StatusPanel statusBoxToAdd={statusBoxToAdd} />
    </div>
  );

const DeleteProjectForm = ({selectedProject, closeDeleteModal, deleteProject}) => (
  <div className="delete-project-form">
    <p className="question">Are you sure you want do delete project
      <strong>{selectedProject.name}</strong>?</p>
    <div className="button-holder">
      <button className="yes" onClick={deleteProject}>Yes</button>
      <button className="no" onClick={closeDeleteModal}>No</button>
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

ProjectListPanelView.defaultProps = {
  modalContent: null,
  statusBoxToAdd: null
};

ProjectListPanelView.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  showingModal: PropTypes.bool.isRequired,
  showDeleteModal: PropTypes.func.isRequired,
  modalContent: PropTypes.element,
  statusBoxToAdd: PropTypes.element
};

DeleteProjectForm.propTypes = {
  selectedProject: PropTypes.object.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired
};

ProjectListPanel.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  authToken: PropTypes.string.isRequired,
  deletedProjectDone: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPanel);
