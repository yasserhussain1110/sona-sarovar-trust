import React, {Component} from 'react';

class EditTestimonialsPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div>edit Testimonial</div>
    );
  }
}

export default EditTestimonialsPanel;
