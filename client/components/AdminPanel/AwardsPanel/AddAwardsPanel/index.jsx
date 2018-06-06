import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addedAward} from '../../../../actions';
import PicForm from '../../../../lib/components/PicForm';
import StatusPanel from '../../../../lib/components/StatusPanel';
import StatusBox from '../../../../lib/components/StatusBox';

class AddAwardsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusBox: null
    };

    this.addAwardSuccess = this.addAwardSuccess.bind(this);
    this.addAwardFailure = this.addAwardFailure.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  addAwardSuccess(award) {
    this.props.addedAward(award);
    this.setState({
      statusBox: (
        <StatusBox success>
          <div><h3>Success!</h3></div>
          <div>Award added successfully.</div>
        </StatusBox>
      )
    });
  }

  addAwardFailure() {
    this.setState({
      statusBox: (
        <StatusBox success={false}>
          <div><h3>Failure!</h3></div>
          <div>Award could not be added.</div>
        </StatusBox>
      )
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <AddAwardsPanelView
        {...this.props}
        addAwardSuccess={this.addAwardSuccess}
        addAwardFailure={this.addAwardFailure}
        statusBox={this.state.statusBox}
        goBack={this.goBack}
      />
    );
  }
}

const AddAwardsPanelView = ({authToken, addAwardSuccess, addAwardFailure, statusBox, goBack}) => (
  <div className="add-awards">
    Add Awards
    <PicForm
      authToken={authToken}
      mode="add"
      url="/api/awards"
      close={goBack}
      onFailure={addAwardFailure}
      onSuccess={addAwardSuccess}
    />
    <StatusPanel statusBoxToAdd={statusBox} />
  </div>
);

const mapStateToProps = state => ({
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {addedAward};

export default connect(mapStateToProps, mapDispatchToProps)(AddAwardsPanel);
