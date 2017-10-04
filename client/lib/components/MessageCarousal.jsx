import React, {Component} from 'react';

class MessageCarousal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentShowingMessageIndex: 0
    };

    this.updateMessage = this.updateMessage.bind(this);
    this.isMessageShowing = this.isMessageShowing.bind(this);

    this.intervalHandler = setInterval(() => {
      this.updateMessage();
    }, props.viewDuration);
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler);
  }

  updateMessage() {
    this.setState({
      currentShowingMessageIndex: (this.state.currentShowingMessageIndex + 1) % this.props.messages.length
    });
  }

  isMessageShowing(index) {
    return this.state.currentShowingMessageIndex === index;
  }

  render() {
    return (
      <div className="carousal-message-container">{this.props.messages.map((message, index) => (
        <div key={index} className={`${this.isMessageShowing(index) ? 'active' : 'inactive'} message`}>
          {message}
        </div>))}
      </div>
    );
  }
}

export default MessageCarousal;
