import React, {Component, cloneElement} from 'react';
import BrandLogoPanel from './HomePanel/BrandLogoPanel';
import CenterPicsPanel from './HomePanel/CenterPicsPanel';
import CaptionsPanel from './HomePanel/CaptionsPanel';
import MainTextPanel from './HomePanel/MainTextPanel';
import StatusPanel from '../../lib/components/StatusPanel';

class HomePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusBoxes: []
    };

    this.addStatusBox = this.addStatusBox.bind(this);
  }

  addStatusBox(statusBox) {
    this.setState({
      statusBoxes: [
        ...this.state.statusBoxes,
        cloneElement(statusBox, {key: this.state.statusBoxes.length})
      ]
    });
  }

  render() {
    return (
      <HomePanelView
        addStatusBox={this.addStatusBox}
        statusBoxes={this.state.statusBoxes}
      />
    );
  }
}

const HomePanelView = ({addStatusBox, statusBoxes}) => (
  <div className="controller home-panel">
    <h1>Home Panel</h1>
    <section className="sub-panel">
      <BrandLogoPanel addStatusBox={addStatusBox}/>
      <CenterPicsPanel addStatusBox={addStatusBox}/>
      <CaptionsPanel addStatusBox={addStatusBox}/>
      <MainTextPanel addStatusBox={addStatusBox}/>
    </section>
    <StatusPanel>
      {statusBoxes}
    </StatusPanel>
  </div>
);

export default HomePanel;
