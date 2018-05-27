export const receivedTestimonials = testimonials => ({
  type: 'RECEIVED_TESTIMONIALS',
  testimonials
});

export const updateTestimonial = (testimonial, index) => ({
  type: 'UPDATE_TESTIMONIAL',
  testimonial,
  index
});

export const deleteTestimonial = index => ({
  type: 'DELETE_TESTIMONIAL',
  index
});
