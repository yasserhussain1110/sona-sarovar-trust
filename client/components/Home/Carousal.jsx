import React, {Component} from 'react';
import ImageCarousal from '../../lib/components/ImageCarousal';
import MessageCarousal from '../../lib/components/MessageCarousal';
import getScrollbarWidth from 'scrollbar-width';
import {getViewPortWidth} from '../../lib/helpers/domHelpers';

const getSizeSubStateFromSrollBarWidth = scrollbarWidth => {
  scrollbarWidth = scrollbarWidth || 0;
  const ratio = 0.35;
  const width = getViewPortWidth() - scrollbarWidth;
  return {
    width,
    height: ratio * width
  }
};

class Carousal extends Component {
  constructor(props) {
    super(props);

    this.scrollbarWidth = null;

    this.state = getSizeSubStateFromSrollBarWidth(this.scrollbarWidth);

    /*
     * This optimisation will not work in the following edge case -
     *   When vertical scrollbar wasn't present originally but
     *   appears because of vertical resize of screen.
     */

    document.addEventListener('DOMContentLoaded', () => {
      this.scrollbarWidth = getScrollbarWidth(true);
      this.setState(getSizeSubStateFromSrollBarWidth(this.scrollbarWidth));
    });

    window.addEventListener("resize", () => this.setState(getSizeSubStateFromSrollBarWidth(this.scrollbarWidth)));
  }

  render() {
    const {imageLinks, messages} = this.props;
    const {height, width, scrollState} = this.state;
    return (
      <div style={{height, width}} className="carousal">
        <ImageCarousal arrows={true} dots={true} imageLinks={imageLinks} viewDuration={10000}/>
        <MessageCarousal messages={messages} viewDuration={6000}/>
      </div>
    );
  }
}

export default Carousal;
