import React,{Component} from 'react';
import CarousalMessage from './CarousalMessage';

const details = [
  "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.",
  "This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide."
];

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
      <div className="home">
        <div className="carousal">
          <img className={this.isActive(0) ? "active" : "inactive"} src="/static/IMG1.jpg" />
          <img className={this.isActive(1) ? "active" : "inactive"} src="/static/IMG2.jpg" />
          <CarousalMessage />
        </div>

        <div className="info">
          <div className="short-bio">
            <h3>Sona Sarovar Trust</h3>
            <div className="details">
              <p>{details[0]}</p>
              <p>{details[1]}</p>
            </div>
          </div>

          <div className="more-links">
            <div className="link">
              <div className="img-container">
                <img src="/static/donate.png" />
              </div>
              <div className="link-button">DONATE</div>
              <div className="link-details">I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.​</div>
            </div>

            <div className="link">
              <div className="img-container">
                <img src="/static/involve.png" />
              </div>
              <div className="link-button">GET INVOLVED</div>
              <div className="link-details">I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.​</div>
            </div>

            <div className="link">
              <div className="img-container">
                <img src="/static/mission.png" />
              </div>
              <div className="link-button">OUR MISSION</div>
              <div className="link-details">I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.​</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
