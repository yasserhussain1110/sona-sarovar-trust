import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../lib/components/Modal';
import PicForm from '../../../lib/components/PicForm';
import {addedCenterPic, updatedCenterPic, deletedCenterPic} from '../../../actions';
import {bindActionCreators} from 'redux';
import axios from 'axios';

class CenterPicsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalForm: false,
      picFormMode: "",   // "update", "add", "delete"
      selectedCenterPicIndex: -1
    };

    this.close = this.close.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.picAddSuccess = this.picAddSuccess.bind(this);
    this.picUpdateSuccess = this.picUpdateSuccess.bind(this);
    this.picDeletedSuccess = this.picDeletedSuccess.bind(this);
  }

  picDeletedSuccess() {
    this.setState({showModalForm: false});
    this.props.deletedCenterPic(this.state.selectedCenterPicIndex);
    this.close();
  }

  close() {
    this.setState({showModalForm: false, selectedCenterPic: -1, picFormMode: ""});
  }

  picUpdateSuccess({url}) {
    this.setState({showModalForm: false});
    this.props.updatedCenterPic(this.state.selectedCenterPicIndex, url);
    this.close();
  }

  picAddSuccess(newCenterPic) {
    this.setState({showModalForm: false});
    this.props.addedCenterPic(newCenterPic);
    this.close();
  }

  getModalContent() {
    switch (this.state.picFormMode) {
      case "delete":
        return (
          <DeletePic
            pic={this.props.centerPics[this.state.selectedCenterPicIndex]}
            close={this.close}
            onDelete={this.picDeletedSuccess}
            authToken={this.props.authToken}
          />
        );
      case "update":
        return (
          <AddOrUpdatePic
            pic={this.props.centerPics[this.state.selectedCenterPicIndex]}
            close={this.close}
            authToken={this.props.authToken}
            mode="update"
            onSuccess={this.picUpdateSuccess}
          />
        );
      case "add":
        return (
          <AddOrUpdatePic
            pic={null}
            close={this.close}
            authToken={this.props.authToken}
            mode="add"
            onSuccess={this.picAddSuccess}
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

const DeletePic = ({pic, close, authToken, onDelete}) => {
  return (
    <div className="delete-pic-form">
      <label>Do you really want to delete this image?</label>
      <img src={pic.url}/>
      <div className="button-holder">
        <button
          className="delete"
          onClick={e => {
            e.preventDefault();
            deletePic(pic._id, authToken, onDelete)
          }}>Yes
        </button>
        <button
          className="no-delete"
          onClick={e => {
            e.preventDefault();
            close()
          }}>No
        </button>
      </div>
    </div>
  );
};

const AddOrUpdatePic = ({pic, close, authToken, mode, onSuccess}) => {
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
        close={close}
        authToken={authToken}
        mode={mode}
        url={`/api/home-page/center-pic${mode === "update" ? `/${pic._id}` : ""}`}
        onSuccess={onSuccess}
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
