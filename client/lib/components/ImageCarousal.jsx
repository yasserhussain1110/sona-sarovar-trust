import React, {Component} from 'react';

class ImageCarousal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentShowingImageIndex: 0
    };

    this.updateShowingImage = this.updateShowingImage.bind(this);
    this.isImageShowing = this.isImageShowing.bind(this);

    this.intervalHandler = setInterval(() => {
      this.updateShowingImage();
    }, props.viewDuration);
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler);
  }

  updateShowingImage() {
    this.setState({
      currentShowingImageIndex: (this.state.currentShowingImageIndex + 1) % this.props.imageLinks.length
    });
  }

  isImageShowing(index) {
    return this.state.currentShowingImageIndex === index;
  }

  render() {
    return (
      <div className="carousal-image-container">{this.props.imageLinks.map((link, index) => (
        <img key={index} className={this.isImageShowing(index) ? 'active' : 'inactive'} src={link}/>))}
      </div>
    );
  }
}

export default ImageCarousal;
