import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {getScrollHandlerForParallax} from '../../lib/helpers/domHelpers';

class VolunteerParallax extends Component {
  constructor(props) {
    super(props);

    this.scrollHandler = null;
  }

  componentDidMount() {
    this.scrollHandler = getScrollHandlerForParallax();
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  render() {
    return <VolunteerParallaxView />;
  }
}

const VolunteerParallaxView = () => (
  <div className="volunteer-parallax">
    <div className="parallax-content">
      <h1>Volunteer</h1>
      <p>
        Our volunteers are awesome. You can be too.
        Please join us and help us with this work.
        That&quot;ll prove your awesome. Many people
        from all walks of life come and join us.
        You should too. It will make a huge difference
        in lives of the underprivileged children.
      </p>

      <div className="button-holder">
        <NavLink to="" className="button button-donate">
          Join Now
        </NavLink>
      </div>
    </div>
  </div>
);

export default VolunteerParallax;
