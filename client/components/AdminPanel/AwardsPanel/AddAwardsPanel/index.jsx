import React, {Component} from 'react';
import {connect} from 'react-redux';
import PicForm from '../../../../lib/components/PicForm';

class AddAwardsPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <AddAwardsPanelView
        {...this.props}
      />
    );
  }
}

const AddAwardsPanelView = ({authToken}) => (
  <div className="add-awards">
    Add Awards
    <PicForm authToken={authToken} mode="add" url="/aksjd" close={() => {}} onSuccess={() => {}} />
  </div>
);

const mapStateToProps = state => ({
  authToken: state.userAuth.authToken
});

export default connect(mapStateToProps)(AddAwardsPanel);
