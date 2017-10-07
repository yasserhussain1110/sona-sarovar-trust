import React, {Component} from 'react';
import {connect} from 'react-redux';
import TeamMemberUpdaterForm from './TeamPanel/TeamMemberUpdaterForm';
import {updatedTeamMember} from '../../actions';
import StatusPanel from '../../lib/components/StatusPanel';

class VolunteersPanel extends Component {
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
      <VolunteersPanelView
        {...this.props}
        statusBoxToAdd={this.state.statusBoxToAdd}
        addStatusBox={this.addStatusBox}
      />
    );
  }
}

const VolunteersPanelView = ({volunteers, authToken, updatedTeamMember, statusBoxToAdd, addStatusBox}) => (
  <div className="controller volunteers-panel">
    <h1>Volunteer Panel</h1>
    <h2>Update volunteer Info</h2>
    <section className="member-info-holder">{volunteers.map((member, index) => (
      <TeamMemberUpdaterForm
        key={member._id}
        index={index}
        member={member}
        authToken={authToken}
        updatedTeamMember={updatedTeamMember}
        addStatusBox={addStatusBox}/>))}
    </section>
    <StatusPanel statusBoxToAdd={statusBoxToAdd}/>
  </div>
);

const mapStateToProps = state => ({
  volunteers: state.team.teamMembers.filter(m => m.type === 'volunteer'),
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedTeamMember};

export default connect(mapStateToProps, mapDispatchToProps)(VolunteersPanel);
