import React, {Component} from 'react';
import {isEmail} from 'validator';
import axios from 'axios';

class DonationBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      amount: '',
      emailError: '',
      amountError: ''
    };

    this.updateAmount = this.updateAmount.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.donate = this.donate.bind(this);
  }

  donate(e) {
    e.preventDefault();
    if (!this.validate()) return;

    axios.post('/api/payment/start', {
      email: this.state.email,
      amount: Number(this.state.amount),
      purpose: 'SonaSarovarDonation',
      redirectUrl: window.location.href + '/done'
    }).then(res => {
      const {paymentRequestUrl} = res.data;
      window.location = paymentRequestUrl;
    }).catch(e => {
      console.log(e);
    });
  }

  updateAmount(e) {
    this.setState({amount: e.target.value});
  }

  updateEmail(e) {
    this.setState({email: e.target.value});
  }

  clearValidation() {
    this.setState({emailError: '', amountError: ''});
  }

  validate() {
    this.clearValidation();

    const {email, amount} = this.state;

    if (!email) {
      this.setState({emailError: 'Email cannot be empty.'});
      return false;
    }

    if (!isEmail(email)) {
      this.setState({emailError: 'Must be a valid email.'});
      return false;
    }

    if (!amount) {
      this.setState({amountError: 'Amount cannot be empty.'});
      return false;
    }

    if (isNaN(Number(amount))) {
      this.setState({amountError: 'Must be a number.'});
      return false;
    }

    if (Number(amount) < 9) {
      this.setState({amountError: 'Must be at least ₹9.'});
      return false;
    }

    return true;
  }

  render() {
    return (
      <DonationBoxView
        {...this.state}
        donate={this.donate}
        updateAmount={this.updateAmount}
        updateEmail={this.updateEmail}
      />
    );
  }
}

const DonationBoxView = ({email, amount, emailError, amountError, updateAmount, updateEmail, donate}) => (
  <div className="donation-box">
    <h3><span>Donate</span></h3>
    <div className="donation-form">
      <h2 className="heading">Support Sona Sarovar Trust</h2>
      <form onSubmit={donate}>
        <div className="field">
          <div className="label">
            <label>Email:</label>
          </div>
          <div className="input">
            <input type="text" onChange={updateEmail} value={email}/>
          </div>
          <div className="error-holder">
            <div className={`error ${emailError ? 'show' : 'hide'}`}>
              <span>{emailError}</span>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="label">
            <label>Amount:</label>
          </div>
          <div className="input">
            <input type="text" onChange={updateAmount} value={amount}/>
          </div>
          <div className="error-holder">
            <div className={`error ${amountError ? 'show' : 'hide'}`}>
              <span>{amountError}</span>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="button-holder">
            <button className="donate-button">Donate!</button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default DonationBox;
