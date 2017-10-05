const validator = require('validator');
const _ = require('lodash');

const paymentValidationObject = {
  amount: {
    required: true,
    validator: a => validator.isFloat(a) && Number(a) >= 9
  },
  purpose: {
    required: true,
    validator: validator.isAlphanumeric
  },
  buyer_name: {
    required: true
  },
  email: {
    required: true,
    validator: validator.isEmail
  },
  phone: {
    required: true,
    validator: p => validator.isMobilePhone(p, 'en-IN')
  },
  redirect_url: {
    required: true,
    validator: url => process.env.NODE_ENV === 'development' || validator.isURL(url)
  }
};

const validateField = (field, obj, validationObj) => {
  const validation = validationObj[field];
  if (obj.hasOwnProperty(field)) {
    if (validation.validator) {
      return validation.validator(obj[field]);
    } else {
      return true;
    }
  } else {
    return !validation.required;
  }
};

const validate = (validationObject, obj) => {
  const validationKeys = Object.keys(validationObject);

  const resultObj = {isValid: true, errors: []};
  for (let i = 0; i < validationKeys.length; i++) {
    let key = validationKeys[i];
    let isValid = validateField(key, obj, validationObject);
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
