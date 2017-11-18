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
        The hundreds of individuals who volunteer to support us are some of our most important and
        inspirational team members. Our volunteers are the backbone of our organization – they not
        only carry the organization’s ideals within them, but also spread the message far and
        beyond, sensitizing the society towards the cause.
      </p>

      <p>
        We encourage and invite volunteers to be an active part of our organization and share the
        same vision and purpose as us – to work for the welfare of children and their families.
      </p>

      <div className="button-holder">
        <NavLink to="web/involve/volunteer" className="button button-donate">
          Join Now
        </NavLink>
      </div>
    </div>
  </div>
);

export default VolunteerParallax;
