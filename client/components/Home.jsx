import React,{Component} from 'react';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      noImages: 2
    };

    this.isActive = this.isActive.bind(this);
    this.updateImage = this.updateImage.bind(this);

    this.intervalHandler = setInterval(() => {
      this.updateImage();
    }, 6000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler);
  }

  updateImage() {
    this.setState({
      active: (this.state.active + 1) % this.state.noImages
    });
  }

  isActive(index) {
    return this.state.active === index;
  }

  render() {
    return (
      <div className="carousal">
        <img className={this.isActive(0) ? "active" : "inactive"} src="/static/IMG1.jpg" />
        <img className={this.isActive(1) ? "active" : "inactive"} src="/static/IMG2.jpg" />
      </div>
    );
  }
}

export default Home;
