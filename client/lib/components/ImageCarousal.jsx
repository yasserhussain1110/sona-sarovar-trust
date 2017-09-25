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
        <img key={index} className={this.isImageShowing(index) ? "active" : "inactive"} src={link}/>))}
        <div className="arrow arrow-left">
          <SvgIcon className="icon-holder" icon={chevronLeft} size={20}/>
        </div>

        <div className="arrow arrow-right">
          <SvgIcon className="icon-holder" icon={chevronRight} size={20}/>
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
