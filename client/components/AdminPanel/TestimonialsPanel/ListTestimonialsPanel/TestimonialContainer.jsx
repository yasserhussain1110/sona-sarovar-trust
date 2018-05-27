import React, {Component} from 'react';

class TestimonialContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.testimonial
    };

    this.updateHeading = this.updateHeading.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updateTestimonialGiverName = this.updateTestimonialGiverName.bind(this);
    this.updateTestimonialGiverDesignation = this.updateTestimonialGiverDesignation.bind(this);
    this.updateTestimonialGiverLocation = this.updateTestimonialGiverLocation.bind(this);
    this.saveUpdatedTestimonial = this.saveUpdatedTestimonial.bind(this);
    this.deleteTestimonial = this.deleteTestimonial.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.testimonials
    });
  }

  updateHeading(e) {
    const heading = e.target.value;
    this.setState({
      heading
    });
  }

  updateMessage(e) {
    const message = e.target.value;
    this.setState({message});
  }

  updateTestimonialGiverName(e) {
    const testimonialGiverName = e.target.value;
    this.setState({testimonialGiverName});
  }

  updateTestimonialGiverDesignation(e) {
    const testimonialGiverDesignation = e.target.value;
    this.setState({testimonialGiverDesignation});
  }

  updateTestimonialGiverLocation(e) {
    const testimonialGiverLocation = e.target.value;
    this.setState({testimonialGiverLocation});
  }

  saveUpdatedTestimonial() {
    this.props.updateTestimonial(this.state, this.props.index);
  }

  deleteTestimonial() {
    this.props.deleteTestimonial(this.props.testimonial, this.props.index);
  }

  render() {
    return (
      <TestimonialContainerView
        testimonial={this.state}
        index={this.props.index}
        updateHeading={this.updateHeading}
        updateMessage={this.updateMessage}
        updateTestimonialGiverName={this.updateTestimonialGiverName}
        updateTestimonialGiverDesignation={this.updateTestimonialGiverDesignation}
        updateTestimonialGiverLocation={this.updateTestimonialGiverLocation}
        saveUpdatedTestimonial={this.saveUpdatedTestimonial}
        deleteTestimonial={this.deleteTestimonial}
      />
    );
  }
}

const TestimonialContainerView = ({
  index, testimonial,
  updateHeading, updateMessage,
  updateTestimonialGiverName,
  updateTestimonialGiverDesignation,
  updateTestimonialGiverLocation,
  saveUpdatedTestimonial,
  deleteTestimonial
}) => (
  <li>
    <div className="sl">Testimonial #{index + 1}</div>
    <div>
      <div>
        <h3>Heading</h3>
      </div>
      <div>
        <input onChange={updateHeading} value={testimonial.heading} />
      </div>
    </div>
    <div>
      <div>
        <h3>Message</h3>
      </div>
      <div>
        <textarea onChange={updateMessage} value={testimonial.message} />
      </div>
    </div>
    <div>
      <span>Name</span>
      <input onChange={updateTestimonialGiverName} value={testimonial.testimonialGiverName} />
    </div>
    <div>
      <span>Designation</span>
      <input
        onChange={updateTestimonialGiverDesignation}
        value={testimonial.testimonialGiverDesignation}
      />
    </div>
    <div>
      <span>Location</span>
      <input
        onChange={updateTestimonialGiverLocation}
        value={testimonial.testimonialGiverLocation}
      />
    </div>

    <div>
      <button onClick={saveUpdatedTestimonial}>Save</button>
      <button onClick={deleteTestimonial}>Delete</button>
    </div>
  </li>
);

export default TestimonialContainer;
