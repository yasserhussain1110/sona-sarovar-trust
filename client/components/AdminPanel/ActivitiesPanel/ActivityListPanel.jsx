import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {clip} from '../../../lib/helpers/functions';
import Modal from '../../../lib/components/Modal';
import {deletedActivityUndertaken} from '../../../actions';
import StatusBox from '../../../lib/components/StatusBox';
import StatusPanel from '../../../lib/components/StatusPanel';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';

class ActivityListPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingModal: false,
      selectedActivityIndex: -1,
      statusBoxToAdd: null
    };

    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
  }

  getModalContent() {
    const selectedActivity = this.props.activities[this.state.selectedActivityIndex];

    return this.state.showingModal ? (
      <DeleteActivityForm
        deleteActivity={this.deleteActivity}
        closeDeleteModal={this.closeDeleteModal}
        selectedActivity={selectedActivity}
      />
    ) : null;
  }

  addStatusBox(statusBox) {
    this.setState({statusBoxToAdd: statusBox});
  }

  deleteActivity() {
    const activity = this.props.activities[this.state.selectedActivityIndex];
    axios.delete(`/api/activity/${activity._id}`, {
      headers: {'x-auth': this.props.authToken}
    }).then(() => {
      this.closeDeleteModal();
      this.props.deletedActivityUndertaken(this.state.selectedActivityIndex);
      this.addStatusBox(
        <StatusBox success>
          <div><h3>Success!</h3></div>
          <div><span>Activity <strong>{activity.name}</strong> deleted successfully.</span></div>
        </StatusBox>
      );
    }).catch(err => {
      handleCommonErrors(err);
      this.addStatusBox(
        <StatusBox success={false}>
          <div><h3>Failure!</h3></div>
          <div><span>Activity could not be deleted.</span></div>
        </StatusBox>
      );
      console.log(err);
    });
  }

  closeDeleteModal() {
    this.setState({showingModal: false});
  }

  showDeleteModal(index) {
    this.setState({showingModal: true, selectedActivityIndex: index});
  }

  render() {
    return (
      <ActivityListPanelView
        activities={this.props.activities}
        modalContent={this.getModalContent()}
        showingModal={this.state.showingModal}
        statusBoxToAdd={this.state.statusBoxToAdd}
        showDeleteModal={this.showDeleteModal}
      />
    );
  }
}

const ActivityListPanelView =
  ({activities, modalContent, showingModal, showDeleteModal, statusBoxToAdd}) => (
    <div className="project-list-panel">
      <div className="add-project-wrapper">
        <h2>Add an Activity</h2>
        <div className="link-holder">
          <NavLink className="success-button" to="/admin/activities/add">
            Add a New Activity
          </NavLink>
        </div>
      </div>

      <div className="list-project-wrapper">
        <h2>List of activities</h2>
        <div className="project-list-container">
          <ul className="project-list">{activities.map((activity, index) => (
            <li key={index} className="project">
              <div className="sl">#{index + 1}</div>
              <div className="img-holder">
                <img alt="" src={activity.pics[0].url} />
              </div>
              <div className="name">{activity.name}</div>
              <div className="description">{clip(activity.description, 40)}</div>
              <div className="button-holder">
                <button className="edit-button">
                  <NavLink to={`/admin/activities/edit/${index}`}>Edit</NavLink>
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

const DeleteActivityForm = ({selectedActivity, closeDeleteModal, deleteActivity}) => (
  <div className="delete-project-form">
    <p className="question">Are you sure you want do delete activity
      <strong>{selectedActivity.name}</strong>?
    </p>
    <div className="button-holder">
      <button className="yes" onClick={deleteActivity}>Yes</button>
      <button className="no" onClick={closeDeleteModal}>No</button>
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    activities: state.activities.activitiesUndertaken,
    authToken: state.userAuth.authToken
  }
);

const mapDispatchToProps = {deletedActivityUndertaken};

ActivityListPanelView.defaultProps = {
  modalContent: null,
  statusBoxToAdd: null
};

ActivityListPanelView.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  showingModal: PropTypes.bool.isRequired,
  showDeleteModal: PropTypes.func.isRequired,
  modalContent: PropTypes.element,
  statusBoxToAdd: PropTypes.element
};

DeleteActivityForm.propTypes = {
  selectedActivity: PropTypes.object.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
  deleteActivity: PropTypes.func.isRequired
};

ActivityListPanel.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  authToken: PropTypes.string.isRequired,
  deletedActivityUndertaken: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityListPanel);
