import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'react-icons-kit';
import {chevronLeft, chevronRight} from 'react-icons-kit/fa';

class ImageCarousal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentShowingImageIndex: 0
    };

    this.updateShowingImage = this.updateShowingImage.bind(this);
    this.isImageShowing = this.isImageShowing.bind(this);
    this.showImageAtIndex = this.showImageAtIndex.bind(this);

    this.intervalHandler = setInterval(() => {
      this.updateShowingImage();
    }, props.viewDuration);
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler);
  }

  showImageAtIndex(index) {
    this.setState({currentShowingImageIndex: index});
  }

  updateShowingImage(goForwardBy = 1) {
    let newIndex = (this.state.currentShowingImageIndex + goForwardBy) % this.props.imageLinks.length;
    if (newIndex < 0) newIndex += this.props.imageLinks.length;
    this.showImageAtIndex(newIndex);
  }

  isImageShowing(index) {
    return this.state.currentShowingImageIndex === index;
  }

  render() {
    const {dots, arrows, imageLinks} = this.props;
    const {currentShowingImageIndex} = this.state;
    return (
      <div className="carousal-image-container">{imageLinks.map((link, index) => (
        <img key={index} className={this.isImageShowing(index) ? "active" : "inactive"} src={link}/>))}
        <div
          className="arrow arrow-left"
          style={{display: arrows ? 'initial' : 'none'}}
          onClick={() => this.updateShowingImage(-1)}>
          <SvgIcon className="icon-holder" icon={chevronLeft} size={20}/>
        </div>

        <div
          className="arrow arrow-right"
          style={{display: arrows ? 'initial' : 'none'}}
          onClick={() => this.updateShowingImage(1)}>
          <SvgIcon className="icon-holder" icon={chevronRight} size={20}/>
        </div>

        <div
          style={{display: dots ? 'initial' : 'none'}}
          className="dots-holder">{imageLinks.map((link, index) => (
          <div
            key={index}
            className={`dot${currentShowingImageIndex === index ? " selected" : ""}`}
            onClick={() => this.showImageAtIndex(index)}/>))}
        </div>
      </div>
    );
  }
}

ImageCarousal.propTypes = {
  imageLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  dots: PropTypes.bool.isRequired,
  arrows: PropTypes.bool.isRequired
};

ImageCarousal.defaultProps = {
  dots: false,
  arrows: false,
};

export default ImageCarousal;
