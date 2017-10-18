const nodemailer = require('nodemailer');
const logger = require('../config/logger');

const {NO_REPLY_EMAIL_HOST, NO_REPLY_EMAIL_ADDRESS, NO_REPLY_PASSWORD} = process.env;

const smtpTransport = nodemailer.createTransport({
  host: NO_REPLY_EMAIL_HOST,
  secureConnection: true,
  port: 465,
  requireTLS: true,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: NO_REPLY_EMAIL_ADDRESS,
    pass: NO_REPLY_PASSWORD
  }
});

const stdMailOptions = {
  from: NO_REPLY_EMAIL_ADDRESS, // sender address
  to: 'contact@sonasarovartrust.org' // list of receivers
};

const volunteerRoutes = app => {
  app.post('/api/apply-volunteer', (req, res) => {
    const {name, email} = req.body;

    if (!name || !email) return res.status(400).send();

    res.status(200).send();

    const mailOptions = Object.assign({}, stdMailOptions, {
      subject: 'Volunteer Application', // Subject line with utf
      text: `${name} wants to volunteer. Contact them at ${email}` // plain text body
      // html: '<b>Hello world?</b>' // html body
    });

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return logger.error(error);
      }
      logger.info('Message sent: %s', info.messageId);
    });
  });
};

module.exports = volunteerRoutes;
