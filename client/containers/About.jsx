import React from 'react';
import {connect} from 'react-redux';

const About = ({teamMembers}) => (
  <div className="about">
    <h2>Meet Our Team</h2>{teamMembers.map((teamMember, index) => (
    <div key={index} className="person-info">
      <div className="img-container">
        <img className="person-img" src={teamMember.pic}/>
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

export default connect(mapStateToProps)(About);
