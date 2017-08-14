import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../lib/components/Modal';
import AddCaptionForm from './CaptionsPanel/AddCaptionForm';
import UpdateCaptionForm from './CaptionsPanel/UpdateCaptionForm';
import DeleteCaptionForm from './CaptionsPanel/DeleteCaptionForm';
import {addedCenterPicCaption, updatedCenterPicCaption, deletedCenterPicCaption} from '../../../actions';

class CaptionsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalForm: false,
      formMode: "",   // "add", "update", "delete"
      selectedCaptionIndex: -1
    };

    this.updateCaption = this.updateCaption.bind(this);
    this.addCaption = this.addCaption.bind(this);
    this.deleteCaption = this.deleteCaption.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({showModalForm: false, formMode: "", selectedCaptionIndex: -1});
  }

  addCaption() {
    this.setState({showModalForm: true, formMode: "add", selectedCaptionIndex: -1});
  }

  deleteCaption(captionIndex) {
    this.setState({showModalForm: true, formMode: "delete", selectedCaptionIndex: captionIndex});
  }

  updateCaption(captionIndex) {
    this.setState({showModalForm: true, formMode: "update", selectedCaptionIndex: captionIndex});
  }

  getModalContent() {
    switch (this.state.formMode) {
      case "add":
        return (
          <AddCaptionForm
            onSuccess={caption => {
              this.props.addedCenterPicCaption(caption);
              this.close();
            }}
            authToken={this.props.authToken}
            close={this.close}
          />
        );
      case "update":
        return (
          <UpdateCaptionForm
            onSuccess={captionText => {
              this.props.updatedCenterPicCaption(this.state.selectedCaptionIndex, captionText);
              this.close();
            }}
            caption={this.props.captions[this.state.selectedCaptionIndex]}
            authToken={this.props.authToken}
            close={this.close}
          />
        );
      case "delete":
        return (
          <DeleteCaptionForm
            onSuccess={() => {
              let selectCaptionIndex = this.state.selectedCaptionIndex;
              this.close();
              this.props.deletedCenterPicCaption(selectCaptionIndex);
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
              <button className="button update-button" onClick={e => this.updateCaption(index)}>Update</button>
              <button className="button delete-button" onClick={e => this.deleteCaption(index)}>Delete</button>
            </div>
          </div>))}
        </div>

        <div className="add-caption-wrapper">
          <button
            onClick={e => this.addCaption()}>
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

const mapDispatchToProps = {addedCenterPicCaption, updatedCenterPicCaption, deletedCenterPicCaption};

export default connect(mapStateToProps, mapDispatchToProps)(CaptionsPanel);