import React, {Component} from 'react';
import axios from 'axios';

class UpdateMainTextForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorTextAreaEmpty: false,
      textAreaValue: props.mainText
    };

    this.updateTextAreaValue = this.updateTextAreaValue.bind(this);
    this.updateMainText = this.updateMainText.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({textAreaValue: nextProps.mainText});
  }

  updateTextAreaValue(e) {
    this.setState({textAreaValue: e.target.value});
  }

  reset() {
    this.setState({textAreaValue: this.props.mainText, errorTextAreaEmpty: false});
  }

  validateTextAreaValue() {
    return !!this.state.textAreaValue;
  }

  updateMainText() {
    if (!this.validateTextAreaValue()) {
      this.setState({errorTextAreaEmpty: true});
      return;
    }

    let {paraNumber, authToken, onSuccess} = this.props;
    let data = {text: this.state.textAreaValue};
    axios.patch(`/api/home-page/mainText/para${paraNumber}`, data, {headers: {'x-auth': authToken}})
      .then(res => {
        onSuccess(data.text);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="update-main-text-form">
        <span className="message">Update text below and click Update</span>
        <textarea
          value={this.state.textAreaValue}
          onChange={this.updateTextAreaValue}
          onFocus={e => this.setState({errorTextAreaEmpty: false})}/>{this.state.errorTextAreaEmpty ?
        <span className="error">Text area must not be empty.</span> : ""}
        <div className="button-holder">
          <button onClick={this.updateMainText}>Update</button>
          <button onClick={this.reset}>Reset</button>
          <button onClick={e => {
            e.preventDefault();
            this.props.close();
          }}>Close
          </button>
        </div>
      </div>
    );
  }
}

export default UpdateMainTextForm;