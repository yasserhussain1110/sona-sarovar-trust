import React, {Component} from 'react';

class AddTestimonialsPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div>Add Testimonial</div>
    );
  }
}

export default AddTestimonialsPanel;
