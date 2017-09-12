import React, {Component} from 'react';
import {connect} from 'react-redux';
import TeamMemberUpdaterForm from './TeamPanel/TeamMemberUpdaterForm';
import {updatedTeamMember} from '../../actions';
import StatusPanel from '../../lib/components/StatusPanel';

class TeamPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusBoxToAdd: null
    };

    this.addStatusBox = this.addStatusBox.bind(this);
  }

  addStatusBox(statusBox) {
    this.setState({statusBoxToAdd: statusBox});
  }

  render() {
    return (
      <TeamPanelView
        {...this.props}
        statusBoxToAdd={this.state.statusBoxToAdd}
        addStatusBox={this.addStatusBox}
      />
    );
  }
}

const TeamPanelView = ({teamMembers, authToken, updatedTeamMember, statusBoxToAdd, addStatusBox}) => (
  <div className="controller team-panel">
    <h1>Team Members Panel</h1>
    <h2>Update Team Member Info</h2>
    <section className="member-info-holder">{teamMembers.map(member => (
      <TeamMemberUpdaterForm
        key={member._id}
        member={member}
        authToken={authToken}
        updatedTeamMember={updatedTeamMember}
        addStatusBox={addStatusBox}/>))}
    </section>
    <StatusPanel statusBoxToAdd={statusBoxToAdd}/>
  </div>
);

const mapStateToProps = state => ({
  teamMembers: state.about.teamMembers,
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedTeamMember};

export default connect(mapStateToProps, mapDispatchToProps)(TeamPanel);
