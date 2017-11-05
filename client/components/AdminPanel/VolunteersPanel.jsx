import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
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

const VolunteersPanelView = ({
  volunteers, authToken, updatedTeamMember, statusBoxToAdd, addStatusBox
}) => (
  <div className="controller team-panel">
    <h1>Volunteer Panel</h1>

    <div className="add-team-member">
      <h2>Add Volunteer</h2>
      <div className="link-holder">
        <NavLink className="success-button" to="/admin/projects/add">Add a New Project</NavLink>
      </div>
    </div>

    <div className="update-team-member">
      <h2>Update volunteer Info</h2>
      <section className="member-info-holder">{volunteers.map((member, index) => (
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
  </div>
);

const mapStateToProps = state => ({
  volunteers: state.team.teamMembers.filter(m => m.type === 'volunteer'),
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedTeamMember};

VolunteersPanelView.defaultProps = {
  statusBoxToAdd: null
};

VolunteersPanelView.propTypes = {
  volunteers: PropTypes.arrayOf(PropTypes.object).isRequired,
  authToken: PropTypes.string.isRequired,
  updatedTeamMember: PropTypes.func.isRequired,
  addStatusBox: PropTypes.func.isRequired,
  statusBoxToAdd: PropTypes.element
};

export default connect(mapStateToProps, mapDispatchToProps)(VolunteersPanel);
