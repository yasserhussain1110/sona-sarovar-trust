import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updatedBrandLogoUrl} from '../../../actions';
import StatusBox from '../../../lib/components/StatusBox';
import PicForm from '../../../lib/components/PicForm';
import Modal from '../../../lib/components/Modal';

class BrandLogoPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingUpdateLogoModal: false
    };

    this.showUpdateLogoModal = this.showUpdateLogoModal.bind(this);
    this.closeUpdateLogoModal = this.closeUpdateLogoModal.bind(this);
    this.updateLogoSuccess = this.updateLogoSuccess.bind(this);
    this.updateLogoFailure = this.updateLogoFailure.bind(this);
  }

  getModalContent() {
    if (this.state.showingUpdateLogoModal) {
      return (
        <div className="update-logo-form">
          <div className="message">
            <span>Updating Brand Logo</span>
            <img alt="" src={this.props.brandLogoUrl} />
          </div>

          <PicForm
            authToken={this.props.authToken}
            url="/api/home-page/brand-logo"
            mode="update"
            close={this.closeUpdateLogoModal}
            onSuccess={this.updateLogoSuccess}
            onFailure={this.updateLogoFailure}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  closeUpdateLogoModal() {
    this.setState({showingUpdateLogoModal: false});
  }

  showUpdateLogoModal() {
    this.setState({showingUpdateLogoModal: true});
  }

  updateLogoSuccess(data) {
    this.closeUpdateLogoModal();
    this.props.updatedBrandLogoUrl(data.url);
    this.props.addStatusBox(
      <StatusBox success>
        <div><h3>Success!</h3></div>
        <div>Brand Logo Updated Successfully.</div>
      </StatusBox>
    );
  }

  updateLogoFailure() {
    this.closeUpdateLogoModal();
    this.props.addStatusBox(
      <StatusBox success={false}>
        <div><h3>Failure!</h3></div>
        <div>Could not update Logo.</div>
      </StatusBox>
    );
  }

  render() {
    return (
      <BrandLogoPanelView
        brandLogoUrl={this.props.brandLogoUrl}
        showUpdateLogoModal={this.showUpdateLogoModal}
        showingUpdateLogoModal={this.state.showingUpdateLogoModal}
        modalContent={this.getModalContent()}
      />
    );
  }
}

const BrandLogoPanelView = ({
  brandLogoUrl, showUpdateLogoModal, showingUpdateLogoModal, modalContent
}) => (
  <div className="brand-logo-panel">
    <h2>Brand Logo Panel</h2>
    <div className="current-logo">
      <h3>Current Logo</h3>
      {brandLogoUrl ? <img alt="" src={brandLogoUrl} /> : ''}
    </div>

    <div className="new-logo">
      <h3>Update Logo</h3>
      <div className="label">
        <span>Click on the
          <span className="info">Update Logo</span> button below to update Logo.
        </span>
      </div>
      <div className="button-holder">
        <button onClick={showUpdateLogoModal}>Update Logo</button>
      </div>
    </div>

    <Modal show={showingUpdateLogoModal}>
      {modalContent}
    </Modal>
  </div>
);

const mapStateToProps = state => (
  {
    brandLogoUrl: state.home.brandLogoUrl,
    authToken: state.userAuth.authToken
  }
);

const mapDispatchToProps = {updatedBrandLogoUrl};

BrandLogoPanel.propTypes = {
  updatedBrandLogoUrl: PropTypes.func.isRequired,
  addStatusBox: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  brandLogoUrl: PropTypes.string.isRequired
};

BrandLogoPanelView.defaultProps = {
  modalContent: null
};

BrandLogoPanelView.propTypes = {
  brandLogoUrl: PropTypes.string.isRequired,
  showUpdateLogoModal: PropTypes.func.isRequired,
  showingUpdateLogoModal: PropTypes.bool.isRequired,
  modalContent: PropTypes.element
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandLogoPanel);
