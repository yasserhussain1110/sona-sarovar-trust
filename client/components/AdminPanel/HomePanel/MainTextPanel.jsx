import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updatedMainTextPara1, updatedMainTextPara2} from '../../../actions';
import Modal from '../../../lib/components/Modal';
import UpdateMainTextForm from './MainTextPanel/UpdateMainTextForm';
import StatusBox from '../../../lib/components/StatusBox';

class MainTextPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalForm: false,
      selectedMainTextParaNumber: -1
    };

    this.updatedMainText = this.updatedMainText.bind(this);
    this.updateMainTextFailed = this.updateMainTextFailed.bind(this);
    this.close = this.close.bind(this);
    this.showFormToUpdateMainText = this.showFormToUpdateMainText.bind(this);
  }

  updateMainTextFailed() {
    this.close();
    this.props.addStatusBox(
      <StatusBox success={false} removeStatusBox={this.props.removeStatusBox}>
        <div><h3>Failure!</h3></div>
        <div>Failed to updated Main Text #{this.state.selectedMainTextParaNumber}.</div>
      </StatusBox>
    );
  }

  close() {
    this.setState({showModalForm: false});
  }

  updatedMainText(text) {
    switch (this.state.selectedMainTextParaNumber) {
      case 1:
        this.close();
        this.props.updatedMainTextPara1(text);
        break;
      case 2:
        this.close();
        this.props.updatedMainTextPara2(text);
        break;
      default:
        console.log("Main Text neither 1 nor 2, something is wrong");
        return;
    }

    this.props.addStatusBox(
      <StatusBox success={true} removeStatusBox={this.props.removeStatusBox}>
        <div><h3>Success!</h3></div>
        <div>Main Text #{this.state.selectedMainTextParaNumber} updated successfully.</div>
      </StatusBox>
    );
  }

  showFormToUpdateMainText(number) {
    if (number === 1 || number === 2) {
      this.setState({selectedMainTextParaNumber: number, showModalForm: true});
    } else {
      console.log("Number should not have been " + number);
    }
  }

  render() {
    let {mainTextPara1, mainTextPara2, authToken} = this.props;
    return (
      <div className="main-text-panel">
        <h2>Main Text Panel</h2>
        <div className="main-text-holder-wrapper">
          <div className="main-text-box-holder">
            <div className="main-text-holder">
              <span>{mainTextPara1}</span>
            </div>
            <div className="button-holder">
              <button onClick={e => this.showFormToUpdateMainText(1)}>Update Text</button>
            </div>
          </div>

          <div className="main-text-box-holder">
            <div className="main-text-holder">
              <span>{mainTextPara2}</span>
            </div>
            <div className="button-holder">
              <button onClick={e => this.showFormToUpdateMainText(2)}>Update Text</button>
            </div>
          </div>
        </div>
        <Modal show={this.state.showModalForm}>
          <UpdateMainTextForm
            authToken={authToken}
            mainText={this.state.selectedMainTextParaNumber === 1 ? mainTextPara1 : mainTextPara2}
            paraNumber={this.state.selectedMainTextParaNumber}
            close={this.close}
            onSuccess={this.updatedMainText}
            onFailure={this.updateMainTextFailed}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    mainTextPara1: state.home.mainTextPara1,
    mainTextPara2: state.home.mainTextPara2,
    authToken: state.userAuth.authToken
  }
);

const mapDispatchToProps = {updatedMainTextPara1, updatedMainTextPara2};

export default connect(mapStateToProps, mapDispatchToProps)(MainTextPanel);
