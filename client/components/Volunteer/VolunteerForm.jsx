import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class VolunteerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameError: '',
      emailError: '',
      email: '',
      showApplicationSuccessStatus: false
    };

    this.updateName = this.updateName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.apply = this.apply.bind(this);
  }

  apply(e) {
    e.preventDefault();
    if (!this.validate()) return;

    const {name, email} = this.state;

    axios.post('/api/apply-volunteer', {name, email}).then(() => {
      setTimeout(() => {
        this.setState({showApplicationSuccessStatus: true});
      }, 1000);

      setTimeout(() => {
        this.setState({showApplicationSuccessStatus: false});
      }, 7000);
    }).catch(e => {
      console.log(e);
    });
  }

  clearValidation() {
    this.setState({
      nameError: '',
      emailError: ''
    });
  }

  updateName(e) {
    this.setState({name: e.target.value});
  }

  updateEmail(e) {
    this.setState({email: e.target.value});
  }

  validate() {
    this.clearValidation();

    const {name, email} = this.state;


    if (!name) {
      this.setState({nameError: 'Name cannot be empty.'});
      return false;
    }

    if (!email) {
      this.setState({emailError: 'Email cannot be empty.'});
      return false;
    }

    return true;
  }

  render() {
    return (
      <VolunteerFormView
        {...this.state}
        updateName={this.updateName}
        updateEmail={this.updateEmail}
        apply={this.apply}
      />
    );
  }
}

const VolunteerFormView = ({
  name, nameError, email, emailError, updateName,
  updateEmail, apply, showApplicationSuccessStatus
}) => (
  <div className="volunteer-apply-form">
    <h3>Let Us Know</h3>
    <form>
      <div className="input">
        <input
          value={name}
          onChange={updateName}
          className=""
          type="text"
          placeholder="Name *"
        />
      </div>

      <div className={`error ${nameError ? 'show' : ''}`}>
        <span>{nameError}</span>
      </div>

      <div className="input">
        <input
          value={email}
          onChange={updateEmail}
          className="small-input"
          type="text"
          placeholder="Email Address *"
        />
      </div>

      <div className={`error ${emailError ? 'show' : ''}`}>
        <span>{emailError}</span>
      </div>

      <div className="button-holder">
        <button onClick={apply} className="button">Apply</button>
      </div>

      <div className={`application-send-message ${showApplicationSuccessStatus ? 'show' : ''}`}>
        <span>Application sent. Thank you for applying.</span>
      </div>
    </form>
  </div>
);

VolunteerFormView.propTypes = {
  name: PropTypes.string.isRequired,
  nameError: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  apply: PropTypes.func.isRequired,
  showApplicationSuccessStatus: PropTypes.bool.isRequired
};

export default VolunteerForm;
