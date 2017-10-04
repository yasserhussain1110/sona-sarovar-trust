const validator = require('validator');
const _ = require('lodash');

const paymentValidationObject = {
  purpose: {
    required: true,
    validator: validator.isAlphanumeric
  },
  amount: {
    required: true,
    validator: a => typeof a === 'number' && a > 0
  },
  email: {
    required: true,
    validator: validator.isEmail
  },
  redirectUrl: {
    required: true,
    validator: url => process.env.NODE_ENV === 'development' || validator.isURL(url)
  }
};

const validateField = (field, obj, validationObj) => {
  const validation = validationObj[field];
  return obj.hasOwnProperty(field) ? validation.validator(obj[field]) : !validation.required;
};

const validate = (validationObject, obj) => {
  const validationKeys = Object.keys(validationObject);

  const resultObj = {isValid: true, errors: []};
  for (let i = 0; i < validationKeys.length; i++) {
    const key = validationKeys[i];
    const isValid = validateField(key, obj, validationObject);
    if (!isValid) {
      resultObj.isValid = false;
      resultObj.errors.push(`${key} has invalid value ${obj[key]}`);
    }
  }

  return resultObj;
};

const validatePaymentRequest = obj => {
  const validationResult = validate(paymentValidationObject, obj);
  if (validationResult.isValid) {
    const validatedObj = _.pick(obj, Object.keys(paymentValidationObject));
    validatedObj.redirect_url = validatedObj.redirectUrl;
    delete validatedObj.redirectUrl;
    delete validationResult.errors;
    validationResult.paymentRequestObject = validatedObj;
    return validationResult;
  } else {
    return validationResult;
  }
};

module.exports = {
  validatePaymentRequest
};
