import React, {Component, cloneElement} from 'react';
import BrandLogoPanel from './HomePanel/BrandLogoPanel';
import CenterPicsPanel from './HomePanel/CenterPicsPanel';
import CaptionsPanel from './HomePanel/CaptionsPanel';
import MainTextPanel from './HomePanel/MainTextPanel';
import StatusPanel from '../../lib/components/StatusPanel';
import {generateRandomHexadecimalStringOfLength} from '../../lib/helpers/functions';

class HomePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusBoxes: []
    };

    this.intervalHandlers = [];

    this.addStatusBox = this.addStatusBox.bind(this);
    this.removeStatusBox = this.removeStatusBox.bind(this);
  }

  componentWillUnmount() {
    this.intervalHandlers.forEach(intervalHandler => clearInterval(intervalHandler));
  }

  removeStatusBox(uuid) {
    let statusBoxes = this.state.statusBoxes.filter(statusBox => statusBox.props.uuid !== uuid);
    this.setState({statusBoxes});
  }

  addStatusBox(statusBox) {
    let uuid = generateRandomHexadecimalStringOfLength(5);
    this.setState({
      statusBoxes: [
        ...this.state.statusBoxes,
        cloneElement(statusBox, {key: uuid, uuid})
      ]
    });

    let intervalHandler = setTimeout(() => {
      this.removeStatusBox(uuid)
    }, 10000);

    this.intervalHandlers.push(intervalHandler);
  }

  render() {
    return (
      <HomePanelView
        addStatusBox={this.addStatusBox}
        removeStatusBox={this.removeStatusBox}
        statusBoxes={this.state.statusBoxes}
      />
    );
  }
}

const HomePanelView = ({addStatusBox, removeStatusBox, statusBoxes}) => (
  <div className="controller home-panel">
    <h1>Home Panel</h1>
    <section className="sub-panel">
      <BrandLogoPanel removeStatusBox={removeStatusBox} addStatusBox={addStatusBox}/>
      <CenterPicsPanel removeStatusBox={removeStatusBox} addStatusBox={addStatusBox}/>
      <CaptionsPanel removeStatusBox={removeStatusBox} addStatusBox={addStatusBox}/>
      <MainTextPanel removeStatusBox={removeStatusBox} addStatusBox={addStatusBox}/>
    </section>
    <StatusPanel>
      {statusBoxes}
    </StatusPanel>
  </div>
);

export default HomePanel;
