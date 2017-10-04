import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import handleCommonErrors from '../../../../lib/handlers/commonErrorsHandler';

class AddCaptionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorTextAreaEmpty: false,
      textAreaValue: ''
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

    const data = {text: this.state.textAreaValue};

    axios.put('/api/home-page/caption', data, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        this.props.onSuccess(res.data);
      })
      .catch(err => {
        handleCommonErrors(err);
        console.log(err);
        this.props.onFailure ? this.props.onFailure() : '';
      });

  }

  render() {
    return (
      <div className="add-caption-form">
        <h3>Adding New Caption</h3>
        <span className="message">Enter Caption in TextArea below and Click Add</span>
        <textarea
          onFocus={e => this.setState({errorTextAreaEmpty: false})}
          value={this.state.textAreaValue}
          onChange={this.updateTextAreaValue}/> {this.state.errorTextAreaEmpty ?
        <span className="error">TextArea should not be empty</span>
        : ''}
        <div className="button-holder">
          <button className="add-button" onClick={this.addCaption}>Add</button>
          <button className="cancel-button" onClick={this.close}>Cancel</button>
        </div>
      </div>
    );
  }
}

AddCaptionForm.propTypes = {
  authToken: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func
};

export default AddCaptionForm;
