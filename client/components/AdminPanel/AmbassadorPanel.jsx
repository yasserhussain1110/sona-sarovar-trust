import React, {Component} from 'react';
import {connect} from 'react-redux';
import TeamMemberUpdaterForm from './TeamPanel/TeamMemberUpdaterForm';
import {updatedTeamMember} from '../../actions';
import StatusPanel from '../../lib/components/StatusPanel';

class AmbassadorPanel extends Component {
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
      <AmbassadorPanelView
        {...this.props}
        statusBoxToAdd={this.state.statusBoxToAdd}
        addStatusBox={this.addStatusBox}
      />
    );
  }
}

const AmbassadorPanelView = ({ambassadors, authToken, updatedTeamMember, statusBoxToAdd, addStatusBox}) => (
  <div className="controller ambassador-panel">
    <h1>Ambassador Panel</h1>
    <h2>Update Ambassador Info</h2>
    <section className="member-info-holder">{ambassadors.map((member, index) => (
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
  ambassadors: state.team.teamMembers.filter(m => m.type === 'ambassador'),
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedTeamMember};

export default connect(mapStateToProps, mapDispatchToProps)(AmbassadorPanel);
