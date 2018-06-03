import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addedAward} from '../../../../actions';
import PicForm from '../../../../lib/components/PicForm';

class AddAwardsPanel extends Component {
  constructor(props) {
    super(props);
    this.addAwardSuccess = this.addAwardSuccess.bind(this);
  }

  addAwardSuccess(award) {
    this.props.addedAward(award);
  }

  render() {
    return (
      <AddAwardsPanelView
        {...this.props}
        addAwardSuccess={this.addAwardSuccess}
      />
    );
  }
}

const AddAwardsPanelView = ({authToken, addAwardSuccess}) => (
  <div className="add-awards">
    Add Awards
    <PicForm authToken={authToken} mode="add" url="/api/awards" close={() => {}} onSuccess={addAwardSuccess} />
  </div>
);

const mapStateToProps = state => ({
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {addedAward};

export default connect(mapStateToProps, mapDispatchToProps)(AddAwardsPanel);
