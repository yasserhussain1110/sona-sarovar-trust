import React, {Component} from 'react';
import BrandLogoPanel from './HomePanel/BrandLogoPanel';
import CenterPicsPanel from './HomePanel/CenterPicsPanel';
import CaptionsPanel from './HomePanel/CaptionsPanel';
import MainTextPanel from './HomePanel/MainTextPanel';
import StatusPanel from '../../lib/components/StatusPanel';

class HomePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusBoxToAdd: null
    };

    this.addStatusBox = this.addStatusBox.bind(this);
  }

  addStatusBox(statusBox) {
    this.setState({
      statusBoxToAdd: statusBox
    });
  }

  render() {
    return (
      <HomePanelView
        addStatusBox={this.addStatusBox}
        statusBoxToAdd={this.state.statusBoxToAdd}
      />
    );
  }
}

const HomePanelView = ({addStatusBox, statusBoxToAdd}) => (
  <div className="controller home-panel">
    <h1>Home Panel</h1>
    <section className="sub-panel">
      <BrandLogoPanel addStatusBox={addStatusBox}/>
      <CenterPicsPanel addStatusBox={addStatusBox}/>
      <CaptionsPanel addStatusBox={addStatusBox}/>
      <MainTextPanel addStatusBox={addStatusBox}/>
    </section>
    <StatusPanel statusBoxToAdd={statusBoxToAdd}/>
  </div>
);

export default HomePanel;
