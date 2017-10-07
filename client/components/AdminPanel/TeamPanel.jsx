import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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

const TeamPanelView =
  ({teamMembers, authToken, updatedTeamMember, statusBoxToAdd, addStatusBox}) => (
    <div className="controller team-panel">
      <h1>Team Members Panel</h1>
      <h2>Update Team Member Info</h2>
      <section className="member-info-holder">{teamMembers.map((member, index) => (
        <TeamMemberUpdaterForm
          key={member._id}
          index={index}
          member={member}
          authToken={authToken}
          updatedTeamMember={updatedTeamMember}
          addStatusBox={addStatusBox}
        />))}
      </section>
      <StatusPanel statusBoxToAdd={statusBoxToAdd} />
    </div>
  );

const mapStateToProps = state => ({
  teamMembers: state.team.teamMembers,
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedTeamMember};

TeamPanelView.defaultProps = {
  statusBoxToAdd: null
};

TeamPanelView.propTypes = {
  teamMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
  authToken: PropTypes.string.isRequired,
  updatedTeamMember: PropTypes.func.isRequired,
  addStatusBox: PropTypes.func.isRequired,
  statusBoxToAdd: PropTypes.element
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamPanel);
