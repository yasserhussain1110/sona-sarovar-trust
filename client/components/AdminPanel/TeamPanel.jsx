import React from 'react';
import {connect} from 'react-redux';
import TeamMemberUpdaterForm from './TeamPanel/TeamMemberUpdaterForm';
import {updatedTeamMember} from '../../actions';

const TeamPanel = ({teamMembers, authToken, updatedTeamMember}) => (
  <div className="controller team-panel">
    <h1>Team Members Panel</h1>
    <h2>Update Team Member Info</h2>
    <section className="member-info-holder">{teamMembers.map(member => (
      <TeamMemberUpdaterForm
        key={member._id}
        member={member}
        authToken={authToken}
        updatedTeamMember={updatedTeamMember}/>))}
    </section>
  </div>
);

const mapStateToProps = state => ({
  teamMembers: state.about.teamMembers,
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedTeamMember};

export default connect(mapStateToProps, mapDispatchToProps)(TeamPanel);
