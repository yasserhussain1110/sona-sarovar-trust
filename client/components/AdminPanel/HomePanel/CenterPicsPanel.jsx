import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../lib/components/Modal';
import PicForm from '../../../lib/components/PicForm';
import {addedCenterPic, updatedCenterPic, deletedCenterPic} from '../../../actions';
import {bindActionCreators} from 'redux';
import StatusBox from '../../../lib/components/StatusBox';
import axios from 'axios';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';

class CenterPicsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalForm: false,
      picFormMode: "",   // "update", "add", "delete"
      selectedCenterPicIndex: -1
    };

    this.closeModal = this.closeModal.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.picAddSuccess = this.picAddSuccess.bind(this);
    this.picAddFailure = this.picAddFailure.bind(this);
    this.picUpdateSuccess = this.picUpdateSuccess.bind(this);
    this.picUpdateFailure = this.picUpdateFailure.bind(this);
    this.picDeletedSuccess = this.picDeletedSuccess.bind(this);
    this.picDeletedFailure = this.picDeletedFailure.bind(this);
  }

  picAddSuccess(newCenterPic) {
    this.closeModal();
    this.props.addedCenterPic(newCenterPic);
    this.props.addStatusBox(
      <StatusBox success={true}>
        <div><h3>Success!</h3></div>
        <div>Pic added to Central Panel.</div>
      </StatusBox>
    );
  }

  picAddFailure() {
    this.closeModal();
    this.props.addStatusBox(
      <StatusBox success={false}>
        <div><h3>Failure!</h3></div>
        <div>Pic could not be added to Central Panel.</div>
      </StatusBox>
    );
  }

  picUpdateSuccess({url}) {
    this.closeModal();
    this.props.updatedCenterPic(this.state.selectedCenterPicIndex, url);
    this.props.addStatusBox(
      <StatusBox success={true}>
        <div><h3>Success!</h3></div>
        <div>Center Panel Pic updated successfully.</div>
      </StatusBox>
    );
  }

  picUpdateFailure() {
    this.closeModal();
    this.props.addStatusBox(
      <StatusBox success={false}>
        <div><h3>Failure!</h3></div>
        <div>Center Panel Pic could not be updated.</div>
      </StatusBox>
    );
  }

  picDeletedSuccess() {
    this.closeModal();
    this.props.deletedCenterPic(this.state.selectedCenterPicIndex);
    this.props.addStatusBox(
      <StatusBox success={true}>
        <div><h3>Success!</h3></div>
        <div>Center Panel Pic deleted successfully.</div>
      </StatusBox>
    );
  }

  picDeletedFailure() {
    this.closeModal();
    this.props.addStatusBox(
      <StatusBox success={false}>
        <div><h3>Failure!</h3></div>
        <div>Center Panel Pic could not be deleted.</div>
      </StatusBox>
    );
  }

  closeModal() {
    this.setState({showModalForm: false, picFormMode: ""});
  }

  getModalContent() {
    switch (this.state.picFormMode) {
      case "delete":
        return (
          <DeletePic
            pic={this.props.centerPics[this.state.selectedCenterPicIndex]}
            closeModal={this.closeModal}
            onDelete={this.picDeletedSuccess}
            authToken={this.props.authToken}
          />
        );
      case "update":
        return (
          <AddOrUpdatePic
            pic={this.props.centerPics[this.state.selectedCenterPicIndex]}
            closeModal={this.closeModal}
            authToken={this.props.authToken}
            mode="update"
            onSuccess={this.picUpdateSuccess}
            onFailure={this.picUpdateFailure}
          />
        );
      case "add":
        return (
          <AddOrUpdatePic
            pic={null}
            closeModal={this.closeModal}
            authToken={this.props.authToken}
            mode="add"
            onSuccess={this.picAddSuccess}
            onFailure={this.picAddFailure}
          />
        );
      default:
        return null;
    }
  }

  render() {
    let {centerPics} = this.props;
    return (
      <div className="center-pic-panel">
        <h2>Center Pics Panel</h2>
        <div className="pic-holder-wrapper">{centerPics.map((centerPic, index) => (
          <div key={centerPic._id} className="pic-box-holder">
            <div className="pic-holder">
              <img src={centerPic.url}/>
            </div>

            <div className="button-holder">
              <button
                onClick={e => this.setState({
                  showModalForm: true,
                  picFormMode: "update",
                  selectedCenterPicIndex: index
                })}
                className="button update-button">
                Update
              </button>

              <button
                onClick={e => this.setState({
                  showModalForm: true,
                  picFormMode: "delete",
                  selectedCenterPicIndex: index
                })}
                className="button delete-button">
                Delete
              </button>
            </div>
          </div>))}
        </div>
        <div className="add-pic-wrapper">
          <button
            className="add-pic-button"
            onClick={e => this.setState({
              showModalForm: true,
              picFormMode: "add",
              selectedCenterPicIndex: -1
            })}>
            Add Pic
          </button>
        </div>
        <Modal show={this.state.showModalForm}>
          {this.getModalContent()}
        </Modal>
      </div>
    );
  }
}

const DeletePic = ({pic, closeModal, authToken, onDelete}) => {
  return (
    <div className="delete-pic-form">
      <label>Do you really want to delete this image?</label>
      <img src={pic.url}/>
      <div className="button-holder">
        <button
          className="delete"
          onClick={e => {
            e.preventDefault();
            deletePic(pic._id, authToken, onDelete);
          }}>Yes
        </button>
        <button
          className="no-delete"
          onClick={e => {
            e.preventDefault();
            closeModal();
          }}>No
        </button>
      </div>
    </div>
  );
};

const AddOrUpdatePic = ({pic, closeModal, authToken, mode, onSuccess, onFailure}) => {
  return (
    <div className={mode === 'add' ? 'add-pic-form' : 'update-pic-form'}>{mode === 'add' ? (
      <div className="message">
        <span>Adding Pic</span>
      </div>) : (
      <div className="message">
        <span>Modifying Pic</span>
        <img src={pic.url}/>
      </div>)}
      <PicForm
        close={closeModal}
        authToken={authToken}
        mode={mode}
        url={`/api/home-page/center-pic${mode === "update" ? `/${pic._id}` : ""}`}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

const deletePic = (picId, authToken, onDelete) => {
  axios.delete(`/api/home-page/center-pic/${picId}`, {headers: {'x-auth': authToken}})
    .then(res => {
      onDelete();
    })
    .catch(err => {
      handleCommonErrors(err);
      console.log(err);
    });
};

const mapStateToProps = state => (
  {
    centerPics: state.home.centerPics,
    authToken: state.userAuth.authToken
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({addedCenterPic, updatedCenterPic, deletedCenterPic}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CenterPicsPanel);
