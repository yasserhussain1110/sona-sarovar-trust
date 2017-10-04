const {validatePaymentRequest} = require('../services');
const axios = require('axios');
const {stringify} = require('querystring');

const {
  INSTAMOJO_PAYMENT_REQUEST_CREATION_URL,
  INSTAMOJO_PAYMENT_STATUS_URL,
  INSTAMOJO_API_KEY,
  INSTAMOJO_AUTH_TOKEN
} = process.env;

const paymentRoutes = app => {
  app.post('/api/payment/start', (req, res) => {
    const body = req.body;

    const validationResult = validatePaymentRequest(body);

    if (!validationResult.isValid) return res.status(400).send();

    axios.post(
      INSTAMOJO_PAYMENT_REQUEST_CREATION_URL, stringify(validationResult.paymentRequestObject), {
        headers: {
          'X-Api-Key': INSTAMOJO_API_KEY,
          'X-Auth-Token': INSTAMOJO_AUTH_TOKEN
        }
      }).then(result => {
      const paymentRequestUrl = result.data.payment_request.longurl;
      res.send({paymentRequestUrl});
    }).catch(e => {
      console.log(e);
      console.log(e.stack);
      if (e.response) console.log(e.response.data);
      res.status(400).send();
    });
  });

  app.post('/api/payment/status', (req, res) => {
    const paymentId = req.body.paymentId;
    if (!paymentId) return res.status(400).send();

    axios.get(`${INSTAMOJO_PAYMENT_STATUS_URL}/${paymentId}`, {
      headers: {
        'X-Api-Key': INSTAMOJO_API_KEY,
        'X-Auth-Token': INSTAMOJO_AUTH_TOKEN
      }
    }).then(result => {
      const payment = result.data.payment;
      if (!payment) return res.send({paymentSucceeded: false});
      res.send({paymentSucceeded: payment.status === 'Credit'});
    }).catch(e => {
      console.log(e);
      console.log(e.stack);
      if (e.response) console.log(e.response.data);
      res.status(400).send();
    });
  });
};

module.exports = paymentRoutes;
