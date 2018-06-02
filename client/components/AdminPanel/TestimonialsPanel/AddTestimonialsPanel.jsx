import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {createUpdators} from '../../../lib/helpers/functions';
import {addTestimonial} from '../../../actions';

class AddTestimonialsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: '',
      message: '',
      testimonialGiverName: '',
      testimonialGiverDesignation: '',
      testimonialGiverLocation: ''
    };

    createUpdators(['heading', 'message', 'testimonialGiverName', 'testimonialGiverDesignation', 'testimonialGiverLocation'])(this);
    this.saveNewTestimonial = this.saveNewTestimonial.bind(this);
  }

  saveNewTestimonial() {
    axios.post('/api/testimonial', this.state, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        this.props.addTestimonial(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <AddTestimonialPanelView
        {...this}
        {...this.state}
      />
    );
  }
}

const AddTestimonialPanelView = ({
  heading, message, testimonialGiverName, testimonialGiverDesignation, testimonialGiverLocation,
  updateHeading, updateMessage, updateTestimonialGiverName, updateTestimonialGiverDesignation,
  updateTestimonialGiverLocation, saveNewTestimonial
}) => (
  <div>
    <h2>Add a testimonial</h2>
    <div>
      <div>
        <h3>Heading</h3>
      </div>
      <div>
        <input onChange={updateHeading} value={heading} />
      </div>
    </div>
    <div>
      <div>
        <h3>Message</h3>
      </div>
      <div>
        <textarea onChange={updateMessage} value={message} />
      </div>
    </div>
    <div>
      <span>Name</span>
      <input onChange={updateTestimonialGiverName} value={testimonialGiverName} />
    </div>
    <div>
      <span>Designation</span>
      <input
        onChange={updateTestimonialGiverDesignation}
        value={testimonialGiverDesignation}
      />
    </div>
    <div>
      <span>Location</span>
      <input
        onChange={updateTestimonialGiverLocation}
        value={testimonialGiverLocation}
      />
    </div>

    <div>
      <button onClick={saveNewTestimonial}>Save</button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {addTestimonial};

export default connect(mapStateToProps, mapDispatchToProps)(AddTestimonialsPanel);
