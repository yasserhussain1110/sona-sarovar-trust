import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {updatedCenterPicCaption, deletedCenterPicCaption} from '../../actions';

class CaptionsPanel extends Component {
  constructor(props) {
    super(props);

    let captions = props.captions.map(caption => Object.assign(caption, {readOnly: true}));
    this.state = {captions};

    this.updateReadOnlyState = this.updateReadOnlyState.bind(this);
    this.updateText = this.updateText.bind(this);
    this.resetText = this.resetText.bind(this);
    this.saveUpdatedTextInDB = this.saveUpdatedTextInDB.bind(this);
    this.deleteCaptionFromDB = this.deleteCaptionFromDB.bind(this);
  }

  deleteCaptionFromDB(index) {
    let caption = this.state.captions[index];
    axios.delete(`/home-page/caption/${caption._id}`, {
      headers: {'x-auth': this.props.authToken}
    }).then(res => {
      this.props.deletedCenterPicCaption(index);
    }).catch(err => {
      console.log(err);
    });
  }

  saveUpdatedTextInDB(index) {
    let caption = this.state.captions[index];
    axios.patch(`/home-page/caption/${caption._id}`, {
      text: caption.text
    }, {
      headers: {'x-auth': this.props.authToken}
    }).then(res => {
      this.props.updatedCenterPicCaption(index, caption.text);
    }).catch(err => {
      console.log(err);
    });
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
            <button onClick={() => this.saveUpdatedTextInDB(index)}>Save</button>
            <button onClick={() => this.deleteCaptionFromDB(index)}>Delete Caption</button>
          </div>))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    captions: state.home.captions,
    authToken: state.userAuth.authToken
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({updatedCenterPicCaption, deletedCenterPicCaption}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CaptionsPanel);
