import React, {Component} from 'react';
import Modal from '../lib/components/Modal';
import {getParameterByName} from '../lib/helpers/functions';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class DonationDoneBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedResult: false,
      paymentSucceeded: false,
      paymentId: ''
    };
  }

  componentDidMount() {
    const paymentId = getParameterByName('payment_id');
    this.setState({paymentId});

    if (!paymentId) return;

    axios.post('/api/payment/status', {paymentId}).then(res => {
      const paymentSucceeded = res.data.paymentSucceeded;
      this.setState({
        paymentSucceeded,
        receivedResult: true
      });
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    return (
      <DonationDoneBoxView
        {...this.state}
      />
    );
  }
}

const DonationDoneBoxView = ({paymentSucceeded, receivedResult, paymentId}) => (
  <div className="donation-done-box">
    <Modal show={true}>
      <div className={`wait-box ${receivedResult ? 'hide' : 'show'}`}>
        <p>We are fetching payment status. Please wait...</p>
      </div>

      <div className={`donation-status ${receivedResult ? 'show' : 'hide'}`}>
        <div className="message">
          <div className={`success-message ${paymentSucceeded ? 'show' : 'hide'}`}>
            <span><h3>Thank You! Your donation was received successfully.</h3></span>
          </div>

          <div className={`failure-message ${paymentSucceeded ? 'hide' : 'show'}`}>
            <span><h3>Sorry! Your donation could not be received.</h3></span>
          </div>

          <p>
            You can note your Payment ID for future reference&nbsp;
            <span className="payment-id">{paymentId}</span>.
          </p>

        </div>

        <div className="button-holder">
          <NavLink className="continue-button" to="/web/donate">Continue</NavLink>
        </div>
      </div>
    </Modal>
  </div>
);

export default DonationDoneBox;
