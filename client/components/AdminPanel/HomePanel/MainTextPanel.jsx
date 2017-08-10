import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updatedMainTextPara1, updatedMainTextPara2} from '../../../actions';
import Modal from '../../../lib/components/Modal';
import UpdateMainTextForm from './MainTextPanel/UpdateMainTextForm';

class MainTextPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalForm: false,
      selectedMainTextParaNumber: -1
    };

    this.updatedMainText = this.updatedMainText.bind(this);
    this.close = this.close.bind(this);
    this.showFormToUpdateMainText = this.showFormToUpdateMainText.bind(this);
  }

  close() {
    this.setState({showModalForm: false, selectedMainTextParaNumber: -1});
  }

  updatedMainText(text) {
    switch (this.state.selectedMainTextParaNumber) {
      case 1:
        this.props.updatedMainTextPara1(text);
        this.close();
        break;
      case 2:
        this.props.updatedMainTextPara2(text);
        this.close();
        break;
      default:
        return null;
    }
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
            paraNumber={this.state.selectedMainTextParaNumber}
            onSuccess={this.updatedMainText}
            mainText={this.state.selectedMainTextParaNumber === 1 ? mainTextPara1 : mainTextPara2}
            close={this.close}
            authToken={authToken}
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