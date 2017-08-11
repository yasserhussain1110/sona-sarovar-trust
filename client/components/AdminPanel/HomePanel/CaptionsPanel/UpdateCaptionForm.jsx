import React, {Component} from 'react';
import axios from 'axios';

class UpdateCaptionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textAreaValue: props.caption.text,
      errorTextAreaEmpty: false
    };

    this.close = this.close.bind(this);
    this.updateCaption = this.updateCaption.bind(this);
    this.resetCaption = this.resetCaption.bind(this);
    this.updateTextAreaValue = this.updateTextAreaValue.bind(this);
  }

  updateTextAreaValue(e) {
    this.setState({textAreaValue: e.target.value});
  }

  validateTextAreaValue() {
    return !!this.state.textAreaValue;
  }

  close(e) {
    e.preventDefault();
    this.props.close();
  }

  resetCaption() {
    this.setState({textAreaValue: this.props.caption.text, errorTextAreaEmpty: false});
  }

  updateCaption() {
    if (!this.validateTextAreaValue()) {
      this.setState({errorTextAreaEmpty: true});
      return;
    }

    let data = {text: this.state.textAreaValue};

    axios.patch(`/api/home-page/caption/${this.props.caption._id}`, data, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        this.props.onSuccess(data.text);
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (
      <div className="update-caption-form">
        <h3>Updating Caption</h3>
        <span>Update Caption below and click Update</span>
        <textarea
          onFocus={e => this.setState({errorTextAreaEmpty: false})}
          value={this.state.textAreaValue}
          onChange={this.updateTextAreaValue}/> {this.state.errorTextAreaEmpty ?
        <span className="error">TextArea should not be empty</span> : ""}
        <button className="update-button" onClick={this.updateCaption}>Update</button>
        <button className="reset-button" onClick={this.resetCaption}>Reset</button>
        <button className="cancel-button" onClick={this.close}>Cancel</button>
      </div>
    );
  }
}

export default UpdateCaptionForm;