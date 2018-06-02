const testimonials = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVED_TESTIMONIALS':
      return action.testimonials;
    case 'UPDATE_TESTIMONIAL':
      return [
        ...state.slice(0, action.index),
        action.testimonial,
        ...state.slice(action.index + 1)
      ];
    case 'DELETE_TESTIMONIAL':
      return state.filter((_, index) => index !== action.index);
    case 'ADD_TESTIMONIAL':
      return [
        ...state,
        action.testimonial
      ];
    default:
      return state;
  }
};

export default testimonials;
