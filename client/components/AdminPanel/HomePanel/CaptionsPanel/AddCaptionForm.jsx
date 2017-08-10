import React, {Component} from 'react';
import axios from 'axios';

class AddCaptionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorTextAreaEmpty: false,
      textAreaValue: ""
    };

    this.addCaption = this.addCaption.bind(this);
    this.close = this.close.bind(this);
    this.updateTextAreaValue = this.updateTextAreaValue.bind(this);
  }

  close(e) {
    e.preventDefault();
    this.props.close();
  }

  updateTextAreaValue(e) {
    this.setState({textAreaValue: e.target.value});
  }

  validateTextAreaValue() {
    return !!this.state.textAreaValue;
  }

  addCaption() {
    if (!this.validateTextAreaValue()) {
      this.setState({errorTextAreaEmpty: true});
      return;
    }

    let data = {text: this.state.textAreaValue};

    axios.put('/home-page/caption', data, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        this.props.onSuccess(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  }

  render() {
    return (
      <div className="add-caption-form">
        <h3>Adding New Caption</h3>
        <span>Enter Caption in TextArea below and Click Add</span>
        <textarea
          onFocus={e => this.setState({errorTextAreaEmpty: false})}
          value={this.state.textAreaValue}
          onChange={this.updateTextAreaValue}/> {this.state.errorTextAreaEmpty ?
        <span className="error">TextArea should not be empty</span>
        : ""}
        <button className="add-button" onClick={this.addCaption}>Add</button>
        <button className="cancel-button" onClick={this.close}>Cancel</button>
      </div>
    );
  }
}

export default AddCaptionForm;
