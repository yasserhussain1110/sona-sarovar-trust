import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../lib/components/Modal';
import AddCaptionForm from './CaptionsPanel/AddCaptionForm';
import UpdateCaptionForm from './CaptionsPanel/UpdateCaptionForm';
import DeleteCaptionForm from './CaptionsPanel/DeleteCaptionForm';
import StatusBox from '../../../lib/components/StatusBox';
import {addedCenterPicCaption, updatedCenterPicCaption, deletedCenterPicCaption} from '../../../actions';

class CaptionsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalForm: false,
      formMode: '',   // "add", "update", "delete"
      selectedCaptionIndex: -1
    };

    this.updateCaption = this.updateCaption.bind(this);
    this.addCaption = this.addCaption.bind(this);
    this.deleteCaption = this.deleteCaption.bind(this);
    this.close = this.close.bind(this);
  }

  getModalContent() {
    switch (this.state.formMode) {
      case 'add':
        return (
          <AddCaptionForm
            onSuccess={caption => {
              this.props.addedCenterPicCaption(caption);
              this.close();
              this.props.addStatusBox(
                <StatusBox success>
                  <div><h3>Success!</h3></div>
                  <div>Added Caption to HomePanel successfully.</div>
                </StatusBox>
              );
            }}
            onFailure={() => {
              this.close();
              this.props.addStatusBox(
                <StatusBox success={false}>
                  <div><h3>Failure!</h3></div>
                  <div>Caption could not be added to HomePanel.</div>
                </StatusBox>
              );
            }}
            authToken={this.props.authToken}
            close={this.close}
          />
        );
      case 'update':
        return (
          <UpdateCaptionForm
            onSuccess={captionText => {
              this.props.updatedCenterPicCaption(this.state.selectedCaptionIndex, captionText);
              this.close();
              this.props.addStatusBox(
                <StatusBox success>
                  <div><h3>Success!</h3></div>
                  <div>HomePanel Caption updated successfully.</div>
                </StatusBox>
              );
            }}
            onFailure={() => {
              this.close();
              this.props.addStatusBox(
                <StatusBox success={false}>
                  <div><h3>Failure!</h3></div>
                  <div>HomePanel Caption could not be updated.</div>
                </StatusBox>
              );
            }}
            caption={this.props.captions[this.state.selectedCaptionIndex]}
            authToken={this.props.authToken}
            close={this.close}
          />
        );
      case 'delete':
        return (
          <DeleteCaptionForm
            onSuccess={() => {
              const selectCaptionIndex = this.state.selectedCaptionIndex;
              this.close();
              this.props.deletedCenterPicCaption(selectCaptionIndex);
              this.props.addStatusBox(
                <StatusBox success>
                  <div><h3>Success!</h3></div>
                  <div>HomePanel Caption deleted successfully.</div>
                </StatusBox>
              );
            }}
            onFailure={() => {
              this.close();
              this.props.addStatusBox(
                <StatusBox success={false}>
                  <div><h3>Failure!</h3></div>
                  <div>HomePanel Caption could not be deleted.</div>
                </StatusBox>
              );
            }}
            close={this.close}
            caption={this.props.captions[this.state.selectedCaptionIndex]}
            authToken={this.props.authToken}
          />
        );
      default:
        return null;
    }
  }

  close() {
    this.setState({showModalForm: false, formMode: '', selectedCaptionIndex: -1});
  }

  addCaption() {
    this.setState({showModalForm: true, formMode: 'add', selectedCaptionIndex: -1});
  }

  deleteCaption(captionIndex) {
    this.setState({showModalForm: true, formMode: 'delete', selectedCaptionIndex: captionIndex});
  }

  updateCaption(captionIndex) {
    this.setState({showModalForm: true, formMode: 'update', selectedCaptionIndex: captionIndex});
  }


  render() {
    return (
      <div className="captions-panel">
        <h2>Captions Panel</h2>
        <div className="caption-holder-wrapper">{this.props.captions.map((caption, index) => (
          <div key={caption._id} className="caption-box-holder">
            <div className="caption-holder">
              <span>{caption.text}</span>
            </div>
            <div className="button-holder">
              <button
                className="button update-button"
                onClick={() => this.updateCaption(index)}
              >Update
              </button>
              <button
                className="button delete-button"
                onClick={() => this.deleteCaption(index)}
              >Delete
              </button>
            </div>
          </div>))}
        </div>

        <div className="add-caption-wrapper">
          <button
            onClick={() => this.addCaption()}
          >
            Add Caption
          </button>
        </div>
        <Modal show={this.state.showModalForm}>
          {this.getModalContent()}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    captions: state.home.captions,
    authToken: state.userAuth.authToken
  }
);

const mapDispatchToProps = {
  addedCenterPicCaption, updatedCenterPicCaption, deletedCenterPicCaption
};

CaptionsPanel.propTypes = {
  addedCenterPicCaption: PropTypes.func.isRequired,
  addStatusBox: PropTypes.func.isRequired,
  deletedCenterPicCaption: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  updatedCenterPicCaption: PropTypes.func.isRequired,
  captions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CaptionsPanel);
