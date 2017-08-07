import React, {Component} from 'react';
import {connect} from 'react-redux';

class CaptionsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      captions: []
    };

    this.updateReadOnlyState = this.updateReadOnlyState.bind(this);
    this.updateText = this.updateText.bind(this);
    this.resetText = this.resetText.bind(this);
  }

  updateText(index, text) {
    this.setState({
      captions: [
        ...this.state.captions.slice(0, index),
        Object.assign({}, this.state.captions[index], {text}),
        ...this.state.captions.slice(index + 1)
      ]
    });
  }

  componentWillReceiveProps(nextProps) {
    let captions = nextProps.captions.map(caption => Object.assign(caption, {readOnly: true}));
    console.log(captions);
    this.setState({captions});
  }

  updateReadOnlyState(index) {
    this.setState({
      captions: [
        ...this.state.captions.slice(0, index),
        Object.assign({}, this.state.captions[index], {readOnly: !this.state.captions[index].readOnly}),
        ...this.state.captions.slice(index + 1)
      ]
    });
  }

  resetText(index) {
    this.setState({
      captions: [
        ...this.state.captions.slice(0, index),
        Object.assign({}, this.state.captions[index], {text: this.props.captions[index].text}),
        ...this.state.captions.slice(index + 1)
      ]
    });
  }

  render() {
    return (
      <div className="controller captions">
        <div className="caption-holder">{this.state.captions.map((caption, index) => (
          <div key={caption._id}>
            <textarea
              readOnly={caption.readOnly}
              value={caption.text}
              onChange={e => this.updateText(index, e.target.value)}
            />
            <button onClick={() => this.updateReadOnlyState(index)}>Click to Edit</button>
            <button onClick={() => this.resetText(index)}>Reset</button>
          </div>))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    captions: state.home.captions
  }
);

export default connect(mapStateToProps)(CaptionsPanel);
