import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

class AwardsPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <AwardsPanelView
        {...this.props}
      />
    );
  }
}

const AwardsPanelView = ({awards}) => (
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
              <button className="remove">Remove</button>
            </li>
          ))
        }
      </ul>
    </div>
  </div>
);

const mapStateToProps = state => ({
  awards: state.awards
});

export default connect(mapStateToProps)(AwardsPanel);
