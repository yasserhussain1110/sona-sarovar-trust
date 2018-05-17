const testimonials = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVED_TESTIMONIALS':
      return action.testimonials;
    default:
      return state;
  }
};

export default testimonials;
