import React, {Component} from 'react';
import ImageCarousal from '../../lib/components/ImageCarousal';
import MessageCarousal from '../../lib/components/MessageCarousal';
import getScrollbarWidth from 'scrollbar-width';

class Carousal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: Math.floor(0.66 * window.innerWidth)
    };

    document.addEventListener('DOMContentLoaded', () => {
      let width = window.innerWidth - getScrollbarWidth(true);
      this.setState({
        width,
        height: Math.floor((2 * width ) / 3)
      });
    }, false);

    window.onresize = () => {
      let width = window.innerWidth - getScrollbarWidth(true);
      this.setState({
        width,
        height: Math.floor((2 * width ) / 3)
      });
    };
  }

  render() {
    const {imageLinks, messages} = this.props;
    return (
      <div style={this.state} className="carousal">
        <ImageCarousal imageLinks={imageLinks} viewDuration={4000}/>
        <MessageCarousal messages={messages} viewDuration={4000}/>
      </div>
    );
  }
}

export default Carousal;
