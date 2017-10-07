import React, {Component} from 'react';
import PropTypes from 'prop-types';
import getScrollbarWidth from 'scrollbar-width';
import ImageCarousal from '../../lib/components/ImageCarousal';
import MessageCarousal from '../../lib/components/MessageCarousal';
import {getViewPortWidth} from '../../lib/helpers/domHelpers';

const getHeightRatio = viewPortWidth => {
  if (viewPortWidth >= 380 && viewPortWidth <= 462) {
    return 0.8;
  } else if (viewPortWidth >= 463 && viewPortWidth <= 650) {
    return 0.8;
  } else if (viewPortWidth >= 651) {
    return 0.35;
  } else {
    return 0.8;
  }
};

const getSizeSubStateFromSrollBarWidth = scrollbarWidth => {
  scrollbarWidth = scrollbarWidth || 0;
  const viewPortWidth = getViewPortWidth();
  const heightRatio = getHeightRatio(viewPortWidth);
  const ratio = heightRatio;
  const width = getViewPortWidth() - scrollbarWidth;
  return {
    width,
    height: ratio * width
  };
};

class Carousal extends Component {
  constructor(props) {
    super(props);

    this.state = getSizeSubStateFromSrollBarWidth();

    const scrollBarWidth = getScrollbarWidth(true);
    if (scrollBarWidth) {
      this.scrollbarWidth = scrollBarWidth;
      this.state = getSizeSubStateFromSrollBarWidth(this.scrollbarWidth);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this.scrollbarWidth = getScrollbarWidth(true);
        this.setState(getSizeSubStateFromSrollBarWidth(this.scrollbarWidth));
      });
    }

    /*
     * This optimisation will not work in the following edge case -
     *   When vertical scrollbar wasn't present originally but
     *   appears because of vertical resize of screen.
     */

    this.resizeHandler = () => this.setState(getSizeSubStateFromSrollBarWidth(this.scrollbarWidth));
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    const {imageLinks, messages} = this.props;
    const {height, width} = this.state;
    return (
      <div style={{height, width}} className="carousal">
        <ImageCarousal arrows dots imageLinks={imageLinks} viewDuration={10000} />
        <MessageCarousal messages={messages} viewDuration={6000} />
      </div>
    );
  }
}

Carousal.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageLinks: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Carousal;
