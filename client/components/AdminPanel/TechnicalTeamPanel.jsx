import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TeamMemberUpdaterForm from './TeamPanel/TeamMemberUpdaterForm';
import {updatedTeamMember} from '../../actions';
import StatusPanel from '../../lib/components/StatusPanel';

class TechnicalTeamPanel extends Component {
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
      <TechnicalTeamPanelView
        {...this.props}
        statusBoxToAdd={this.state.statusBoxToAdd}
        addStatusBox={this.addStatusBox}
      />
    );
  }
}

const TechnicalTeamPanelView = ({
  techTeam, authToken, updatedTeamMember, statusBoxToAdd, addStatusBox
}) => (
  <div className="controller team-panel">
    <h1>Technical Team Panel</h1>
    <h2>Update Tech Team Info</h2>
    <section className="member-info-holder">{techTeam.map((member, index) => (
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
  techTeam: state.team.teamMembers.filter(m => m.type === 'technical'),
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedTeamMember};

TechnicalTeamPanelView.defaultProps = {
  statusBoxToAdd: null
};

TechnicalTeamPanelView.propTypes = {
  techTeam: PropTypes.arrayOf(PropTypes.object).isRequired,
  authToken: PropTypes.string.isRequired,
  updatedTeamMember: PropTypes.func.isRequired,
  addStatusBox: PropTypes.func.isRequired,
  statusBoxToAdd: PropTypes.element
};

export default connect(mapStateToProps, mapDispatchToProps)(TechnicalTeamPanel);
