import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import TestimonialContainer from './TestimonialContainer';
import Modal from '../../../../lib/components/Modal';
import StatusPanel from '../../../../lib/components/StatusPanel';
import {updateTestimonial, deleteTestimonial} from '../../../../actions';

class ListTestimonialsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingModal: false,
      modalContent: null
    };

    this.updateTestimonial = this.updateTestimonial.bind(this);
    this.deleteTestimonialConfirm = this.deleteTestimonialConfirm.bind(this);
    this.deleteTestimonial = this.deleteTestimonial.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  updateTestimonial(testimonial, index) {
    const testimonialId = testimonial._id;
    axios.patch(`/api/testimonial/${testimonialId}`, testimonial, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        this.props.updateTestimonial(res.data, index);
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTestimonialConfirm(testimonial, index) {
    const testimonialId = testimonial._id;
    axios.delete(`/api/testimonial/${testimonialId}`, {headers: {'x-auth': this.props.authToken}})
      .then(() => {
        this.props.deleteTestimonial(index);
        this.hideModal();
      })
      .catch(e => {
        console.log(e);
      });
  }

  hideModal() {
    this.setState({
      showingModal: false,
      modalContent: null
    });
  }

  deleteTestimonial(testimonial, index) {
    this.setState({
      showingModal: true,
      modalContent: (
        <div>
          <h4>Are you sure you want to delete testimonial?</h4>
          <button onClick={() => this.deleteTestimonialConfirm(testimonial, index)}>Yes</button>
          <button onClick={this.hideModal}>No</button>
        </div>
      )
    });
  }

  render() {
    return (
      <ListTestimonialsPanelView
        {...this.props}
        updateTestimonial={this.updateTestimonial}
        showingModal={this.state.showingModal}
        modalContent={this.state.modalContent}
        deleteTestimonial={this.deleteTestimonial}
      />
    );
  }
}

const ListTestimonialsPanelView = ({testimonials, updateTestimonial, showingModal, modalContent, deleteTestimonial}) => (
  <div className="project-list-panel testimonials-list-panel">
    <div className="add-project-wrapper">
      <h2>Add a Testimonial</h2>
      <div className="link-holder">
        <NavLink className="success-button" to="/admin/projects/add">Add a New Testimonial</NavLink>
      </div>
    </div>

    <div className="list-project-wrapper">
      <h2>List of Testimonials</h2>
      <div className="project-list-container">
        <ul className="">
          {testimonials.map((testimonial, index) => (
            <TestimonialContainer
              updateTestimonial={updateTestimonial}
              key={testimonial._id}
              index={index}
              testimonial={testimonial}
              deleteTestimonial={deleteTestimonial}
            />
          ))}
        </ul>
      </div>
    </div>
    <Modal show={showingModal}>
      {modalContent}
    </Modal>
    <StatusPanel />
  </div>
);

const mapStateToProps = state => ({
  testimonials: state.testimonials,
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updateTestimonial, deleteTestimonial};

export default connect(mapStateToProps, mapDispatchToProps)(ListTestimonialsPanel);
