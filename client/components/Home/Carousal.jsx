import React, {Component} from 'react';
import CarousalMessageContainer from './CarousalMessageContainer';
import CarousalImageContainer from './CarousalImageContainer';

const imageLinks = [
  "/static/IMG1.jpg",
  "/static/IMG2.jpg",
];

const messages = [
  "66% of street children in Mumbai never receive any education.",
  "You can make a difference in their lives.",
  "Come, join our hands in helping improve their lives."
];

class Carousal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfImages: imageLinks.length,
      activeImageIndex: 0,
      numberOfMessages: messages.length,
      activeMessageIndex: 0
    };

    this.updateChildComponentIndex = this.updateChildComponentIndex.bind(this);
    this.isChildComponentActive = this.isChildComponentActive.bind(this);

    this.carousalImageContainerHandler = setInterval(() => {
      this.updateChildComponentIndex('numberOfImages', 'activeImageIndex');
    }, 6000);

    this.carousalMessageContainerHandler = setInterval(() => {
      this.updateChildComponentIndex('numberOfMessages', 'activeMessageIndex');
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.carousalImageContainerHandler);
    clearInterval(this.carousalMessageContainerHandler);
  }

  updateChildComponentIndex(propSizeOfCollection, propCurrentlySelected) {
    let size = this.state[propSizeOfCollection];
    let selected = this.state[propCurrentlySelected];
    let updateObj = {};
    updateObj[propCurrentlySelected] = (selected + 1) % size;
    this.setState(updateObj);
  }

  isChildComponentActive(propCurrentlySelected, index) {
    return this.state[propCurrentlySelected] === index;
  }

  render() {
    return (
      <div className="carousal">
        <CarousalImageContainer
          isImageActive={this.isChildComponentActive.bind(null, 'activeImageIndex')}
          imageLinks={imageLinks}
        />
        <CarousalMessageContainer
          isMessageActive={this.isChildComponentActive.bind(null, 'activeMessageIndex')}
          messages={messages}
        />
      </div>
    );
  }
}

export default Carousal;
