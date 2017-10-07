import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TeamMemberUpdaterForm from './TeamPanel/TeamMemberUpdaterForm';
import {updatedTeamMember} from '../../actions';
import StatusPanel from '../../lib/components/StatusPanel';

class TrusteesPanel extends Component {
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
      <TrusteesPanelView
        {...this.props}
        statusBoxToAdd={this.state.statusBoxToAdd}
        addStatusBox={this.addStatusBox}
      />
    );
  }
}

const TrusteesPanelView = ({
  trustees, authToken, updatedTeamMember, statusBoxToAdd, addStatusBox
}) => (
  <div className="controller trustees-panel">
    <h1>Trustees Panel</h1>
    <h2>Update Trustee Info</h2>
    <section className="member-info-holder">{trustees.map((member, index) => (
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
  trustees: state.team.teamMembers.filter(m => m.type === 'trustee'),
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedTeamMember};

TrusteesPanelView.defaultProps = {
  statusBoxToAdd: null
};

TrusteesPanelView.propTypes = {
  trustees: PropTypes.arrayOf(PropTypes.object).isRequired,
  authToken: PropTypes.string.isRequired,
  updatedTeamMember: PropTypes.func.isRequired,
  addStatusBox: PropTypes.func.isRequired,
  statusBoxToAdd: PropTypes.element
};

export default connect(mapStateToProps, mapDispatchToProps)(TrusteesPanel);
