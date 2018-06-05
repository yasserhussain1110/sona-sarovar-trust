import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {deletedAward} from '../../../../actions';
import Modal from '../../../../lib/components/Modal';
import StatusPanel from '../../../../lib/components/StatusPanel';
import StatusBox from '../../../../lib/components/StatusBox';

class AwardsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalContent: null,
      showingModal: false,
      statusBox: null
    };

    this.deleteAward = this.deleteAward.bind(this);
    this.deleteAwardConfirm = this.deleteAwardConfirm.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  deleteAward(e) {
    const awardId = e.target.dataset.awardId;
    this.setState({
      showingModal: true,
      modalContent: (
        <div>
          <h4>Are you sure you want to delete award?</h4>
          <button onClick={() => this.deleteAwardConfirm(awardId)}>Yes</button>
          <button onClick={this.hideModal}>No</button>
        </div>
      )
    });
  }

  hideModal() {
    this.setState({
      showingModal: false,
      modalContent: null
    });
  }

  deleteAwardConfirm(awardId) {
    axios.delete(`/api/awards/${awardId}`, {
      headers: {'x-auth': this.props.authToken}
    }).then(() => {
      this.setState({
        statusBox: (
          <StatusBox success>
            <div><h3>Success!</h3></div>
            <div>Award deleted successfully.</div>
          </StatusBox>
        )
      });
    }).then(() => {
      this.props.deletedAward(awardId);
      this.hideModal();
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    return (
      <AwardsPanelView
        {...this.props}
        deleteAward={this.deleteAward}
        showingModal={this.state.showingModal}
        modalContent={this.state.modalContent}
        statusBox={this.state.statusBox}
      />
    );
  }
}

const AwardsPanelView = ({awards, deleteAward, showingModal, modalContent, statusBox}) => (
  <div>
    <h2>Awards Panel</h2>
    <div className="add-award">
      <NavLink to="/admin/awards/add" className="add-award-button">Add Award</NavLink>
    </div>
    <div className="wrapper">
      <h3>List of Awards</h3>
      <ul>
        {
          awards.map(award => (
            <li key={award._id} className="card">
              <img src={award.url} alt={award.url} />
              <div className="space" />
              <button onClick={deleteAward} data-award-id={award._id} className="remove">
                Remove
              </button>
            </li>
          ))
        }
      </ul>
    </div>
    <Modal show={showingModal}>
      {modalContent}
    </Modal>
    <StatusPanel statusBoxToAdd={statusBox} />
  </div>
);

const mapStateToProps = state => ({
  awards: state.awards,
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {deletedAward};

export default connect(mapStateToProps, mapDispatchToProps)(AwardsPanel);
