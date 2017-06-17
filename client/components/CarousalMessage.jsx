import React, {Component} from 'react';

// const messages = [
//   <div>66% of street children in Mumbai never receive any education.</div>,
//   <div>You can make a difference in their lives.</div>,
//   <div>Come, join our hands in helping improve their lives.</div>
// ];

const messages = [
  "66% of street children in Mumbai never receive any education.",
  "You can make a difference in their lives.",
  "Come, join our hands in helping improve their lives."
];

class CarousalMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageIndex: 0
    };

    this.intervalHandler = setInterval(() => {
      this.updateMessageIndex();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler);
  }

  updateMessageIndex() {
    this.setState({
      messageIndex: (this.state.messageIndex + 1) % messages.length
    });
  }

  render() {
    return (
      <div className="carousal-message-container">{messages.map((message, index) => (
        <div
          key={index}
          className={`${index === this.state.messageIndex ? "active" : "inactive"} message`}>
          {message}
        </div>))}
      </div>
    );
  }
}

export default CarousalMessage;
