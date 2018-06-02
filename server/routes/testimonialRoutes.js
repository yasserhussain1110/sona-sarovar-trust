const auth = require('../middleware/auth');
const Testimonial = require('../models/testimonial');
const logger = require('../config/logger');

const testimonialRoutes = app => {
  app.patch('/api/testimonial/:_id', auth, (req, res) => {
    const _id = req.params._id;
    Testimonial.findOneAndUpdate({_id}, req.body, {runValidators: true, returnNewDocument: true})
      .then(testimonial => {
        res.status(200).send(testimonial);
      })
      .catch(e => {
        logger.error(e.message, e);
        res.status(400).send();
      });
  });

  app.delete('/api/testimonial/:_id', auth, (req, res) => {
    const _id = req.params._id;
    Testimonial.findOneAndRemove({_id})
      .then(testimonial => {
        res.status(200).send(testimonial);
      })
      .catch(e => {
        logger.error(e.message, e);
        res.status(400).send();
      });
  });

  app.post('/api/testimonial', auth, (req, res) => {
    new Testimonial(req.body).save().then(testimonial => {
      res.send(testimonial);
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });
};

module.exports = testimonialRoutes;
