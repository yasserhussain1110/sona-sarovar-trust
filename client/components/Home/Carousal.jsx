import React, {Component} from 'react';
import ImageCarousal from '../../lib/components/ImageCarousal';
import MessageCarousal from '../../lib/components/MessageCarousal';
import getScrollbarWidth from 'scrollbar-width';
import addHandler from '../../lib/helpers/addHandler';

const getSizeSubState = () => {
  let scrollbarWidth = getScrollbarWidth(true) || 0;
  let ratio = 0.66;
  let width = window.innerWidth - scrollbarWidth;
  return {
    width,
    height: ratio * width
  }
};

class Carousal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...getSizeSubState(),
      scrollState: "top"    // "top", "scrolled"
    };

    document.addEventListener('DOMContentLoaded', () => this.setState(getSizeSubState()), false);

    window.onresize = () => this.setState(getSizeSubState());

    addHandler(window, "onscroll", () => {
      if (window.scrollY > 100) {
        this.setState({scrollState: "scrolled"});
      } else {
        this.setState({scrollState: "top"});
      }
    });
  }

  render() {
    const {imageLinks, messages} = this.props;
    const {height, width, scrollState} = this.state;
    return (
      <div style={{height, width}} className={`carousal ${scrollState}`}>
        <ImageCarousal imageLinks={imageLinks} viewDuration={4000}/>
        <MessageCarousal messages={messages} viewDuration={4000}/>
      </div>
    );
  }
}

export default Carousal;
