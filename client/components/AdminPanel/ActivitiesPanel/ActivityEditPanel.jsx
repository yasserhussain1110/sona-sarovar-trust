import React, {Component, cloneElement} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {updatedActivityNameAndDescription, addedPicToActivity, updatedActivityPic} from '../../../actions';
import StatusBox from '../../../lib/components/StatusBox';
import StatusPanel from '../../../lib/components/StatusPanel';
import Modal from '../../../lib/components/Modal';
import PicForm from '../../../lib/components/PicForm';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';

const createStateFromActivity = activity => {
  let name = "", description = "", pics = [];
  if (activity) {
    ({name, description, pics} = activity);
  }
  return {name, description, pics};
};

const createInitState = () => ({
  nameError: "",
  descriptionError: "",

  statusBoxes: [],

  updatingPic: false,
  deletingPic: false,
  selectedPic: null
});

class ActivityEditPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...createInitState(),
      ...createStateFromActivity(props.activity)
    };

    this.updateStateField = this.updateStateField.bind(this);
    this.updateActivity = this.updateActivity.bind(this);
    this.updatePic = this.updatePic.bind(this);
    this.deletePic = this.deletePic.bind(this);
    this.updatedActivityPic = this.updatedActivityPic.bind(this);
    this.updateActivityPicFailed = this.updateActivityPicFailed.bind(this);
  }

  updateActivityPicFailed() {
    this.setState({updatingPic: false, deletingPic: false});
    this.addStatusBox(
      <StatusBox success={false}>
        <div><h3>Failure!</h3></div>
        <div>Activity Pic could not be updated</div>
      </StatusBox>
    );
  }

  updatedActivityPic({url}) {
    this.props.updatedActivityPic(this.props.match.params.index, this.state.selectedPic._id, url);
    this.setState({updatingPic: false, deletingPic: false});
    this.addStatusBox(
      <StatusBox success={true}>
        <div><h3>Success!</h3></div>
        <div>Activity Pic Updated Successfully</div>
      </StatusBox>
    );
  }

  addStatusBox(statusBox) {
    this.setState({
      statusBoxes: [
        ...this.state.statusBoxes,
        cloneElement(statusBox, {key: this.state.statusBoxes.length})
      ]
    });
  }

  updatePic(pic) {
    this.setState({updatingPic: true, selectedPic: pic});
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
    axios.patch(`/api/activity/${this.props.activity._id}`, {name, description}, {
      headers: {'x-auth': this.props.authToken}
    })
      .then(res => {
        this.props.updatedActivityNameAndDescription(name, description, this.props.match.params.index);
        this.addStatusBox(
          <StatusBox success={true}>
            <div><h3>Success!</h3></div>
            <div>Updated Activity Name and Description</div>
          </StatusBox>
        )
      })
      .catch(err => {
        console.log(err);
        handleCommonErrors(err);
        this.addStatusBox(
          <StatusBox success={false}>
            <div><h3>Failure!</h3></div>
            <div>Activity Name and Description updation failed</div>
          </StatusBox>
        )
      });
  }

  uploadMorePics() {
    let pics = document.getElementById("edit-panel-pic").files;
    if (pics.length === 0) return;

    for (let i = 0; i < pics.length; i++) {
      let data = new FormData();
      data.append('pic', pics[i]);

      axios.put(`/api/activity/pic/${this.props.activity._id}`, data, {headers: {'x-auth': this.props.authToken}})
        .then(res => {
          this.props.addedPicToActivity(res.data, this.props.match.params.index);
          this.addStatusBox(
            <StatusBox success={true}>
              <div><h3>Success!</h3></div>
              <div>More Pics added to Activity</div>
            </StatusBox>
          )
        })
        .catch(err => {
          console.log(err);
          handleCommonErrors(err);
          this.addStatusBox(
            <StatusBox success={false}>
              <div><h3>Failure!</h3></div>
              <div>Adding more pics to Activity failed!</div>
            </StatusBox>
          )
        });
    }

    document.getElementById("edit-panel-pic").value = null;
  }

  updateActivity() {
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
    this.setState(createStateFromActivity(nextProps.activity));
  }

  render() {
    return (
      <PanelView
        {...this.state}
        updateStateField={this.updateStateField}
        updateActivity={this.updateActivity}
        updatePic={this.updatePic}
        deletePic={this.deletePic}
        closeModal={() => this.setState({updatingPic: false, deletingPic: false})}
        authToken={this.props.authToken}
        updatedActivityPic={this.updatedActivityPic}
        updateActivityPicFailed={this.updateActivityPicFailed}
      />
    );
  }
}

const getUpdatePicModal = (pic, closeModal, authToken, updatedActivityPic, updateActivityPicFailed) => (
  <Modal show={true}>
    <div className="update-pic-form">
      <div className="message">
        <span>Modifying Pic</span>
        <img src={pic.url}/>
      </div>
      <PicForm
        close={closeModal}
        authToken={authToken}
        mode="update"
        url={`/api/activity/pic/${pic._id}`}
        onSuccess={updatedActivityPic}
        onFailure={updateActivityPicFailed}
      />
    </div>
  </Modal>
);

const getDeletePicModal = (pic, closeModal, authToken, updatedActivityPic, updateActivityPicFailed) => (
  <Modal show={true}>
    {`Deleting pic ${pic._id}`}
  </Modal>
);

const getModal = (updatingPic, deletingPic, selectedPic, closeModal, authToken, updatedActivityPic, updateActivityPicFailed) => {
  if (updatingPic) {
    return getUpdatePicModal(selectedPic, closeModal, authToken, updatedActivityPic, updateActivityPicFailed);
  } else if (deletingPic) {
    return getDeletePicModal(selectedPic, closeModal, authToken, updatedActivityPic, updateActivityPicFailed);
  } else {
    return <Modal show={false}/>
  }
};


const PanelView = ({
                     name, description, pics, nameError,
                     descriptionError, updateStateField, updateActivity,
                     statusBoxes, updatingPic, deletingPic, selectedPic,
                     updatePic, deletePic, closeModal, authToken,
                     updatedActivityPic, updateActivityPicFailed
                   }) => (
  <div className="project-edit-panel">
    <h2>Edit Activity</h2>
    <ActivityEditForm
      name={name}
      description={description}
      pics={pics}
      nameError={nameError}
      descriptionError={descriptionError}
      updateStateField={updateStateField}
      updateActivity={updateActivity}
      updatePic={updatePic}
      deletePic={deletePic}
    />
    <StatusPanel>
      {statusBoxes}
    </StatusPanel>
    {getModal(updatingPic, deletingPic, selectedPic, closeModal, authToken, updatedActivityPic, updateActivityPicFailed)}
  </div>
);

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

const mapStateToProps = (state, ownProps) => ({
  activity: state.activities.activitiesUndertaken[ownProps.match.params.index],
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedActivityNameAndDescription, addedPicToActivity, updatedActivityPic};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityEditPanel);
