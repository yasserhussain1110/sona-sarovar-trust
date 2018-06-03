import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {deletedAward} from '../../../../actions';

class AwardsPanel extends Component {
  constructor(props) {
    super(props);

    this.deleteAward = this.deleteAward.bind(this);
  }

  deleteAward(e) {
    const awardId = e.target.dataset.awardId;
    axios.delete(`/api/awards/${awardId}`, {
      headers: {'x-auth': this.props.authToken}
    }).then(() => {
      this.props.deletedAward(awardId);
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    return (
      <AwardsPanelView
        {...this.props}
        deleteAward={this.deleteAward}
      />
    );
  }
}

const AwardsPanelView = ({awards, deleteAward}) => (
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
  </div>
);

const mapStateToProps = state => ({
  awards: state.awards,
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {deletedAward};

export default connect(mapStateToProps, mapDispatchToProps)(AwardsPanel);
