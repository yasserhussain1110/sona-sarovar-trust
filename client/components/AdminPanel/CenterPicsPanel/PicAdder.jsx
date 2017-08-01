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
    return (
      <div className="pic-adder">{!this.state.addingPic ?
        <AdderButton
          onClick={() => this.setState({addingPic: true})}
        /> :
        <PicAdderForm />}
      </div>
    );
  }
}

const AdderButton = ({onClick}) => (
  <div className="adder-button">
    <button onClick={onClick}>+</button>
  </div>
);

export default PicAdder;
