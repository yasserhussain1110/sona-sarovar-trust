import React, {Component} from 'react';
import PicAdderForm from './PicAdderForm';

class PicAdder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingPic: false
    };
  }

  render() {
    return (!this.state.addingPic ?
        <AdderButton
          turnOnAddingPicSwitch={() => this.setState({addingPic: true})}
        /> :
        <PicAdderForm goBack={() => this.setState({addingPic: false})}/>
    );
  }
}

const AdderButton = ({turnOnAddingPicSwitch}) => (
  <div className="adder-button-holder">
    <button className="adder-button" onClick={turnOnAddingPicSwitch}>+</button>
  </div>
);

export default PicAdder;
