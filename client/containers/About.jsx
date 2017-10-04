import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const About = ({teamMembers}) => (
  <div className="about">
    <h2>Meet Our Team</h2>{teamMembers.map((teamMember, index) => (
      <div key={index} className="person-info">
        <div className="img-container">
          <img alt="" className="person-img" src={teamMember.pic} />
        </div>

        <div className="info">
          <h3>{teamMember.name}</h3>
          <p className="info-para">{teamMember.info}</p>
        </div>
      </div>))}
  </div>
);

const mapStateToProps = state => (
  {
    teamMembers: state.about.teamMembers
  }
);

About.propTypes = {
  teamMembers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps)(About);
