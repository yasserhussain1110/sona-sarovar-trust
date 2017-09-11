import React, {Component, cloneElement} from 'react';
import {generateRandomHexadecimalStringOfLength} from '../../lib/helpers/functions';

const statusBoxPropertyAdder = moreProps => statusBox => {
  let uuid = generateRandomHexadecimalStringOfLength(5);
  return cloneElement(statusBox, {
    key: uuid,
    uuid,
    ...moreProps
  });
};

class StatusPanel extends Component {
  constructor(props) {
    super(props);

    this.removeStatusBox = this.removeStatusBox.bind(this);
    this.addPropsToStatusBox = statusBoxPropertyAdder({removeStatusBox: this.removeStatusBox});

    this.state = {
      statusBoxes: props.statusBoxToAdd === null ? [] : [this.addPropsToStatusBox(props.statusBoxToAdd)]
    };

    this.intervalHandlers = this.state.statusBoxes.map(
      statusBox => setInterval(() => this.removeStatusBox(statusBox.props.uuid), 10000)
    );
  }

  removeStatusBox(uuid) {
    let statusBoxes = this.state.statusBoxes.filter(statusBox => statusBox.props.uuid !== uuid);
    this.setState({statusBoxes});
  }

  componentWillUnmount() {
    this.intervalHandlers.map(intervalHandler => clearInterval(intervalHandler));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statusBoxToAdd === null) {
      return;
    }

    if (this.props.statusBoxToAdd === nextProps.statusBoxToAdd) {
      return;
    }

    let newStatusBox = this.addPropsToStatusBox(nextProps.statusBoxToAdd);

    this.setState({
      statusBoxes: [
        ...this.state.statusBoxes,
        newStatusBox
      ]
    });

    this.intervalHandlers.push(setInterval(() => this.removeStatusBox(newStatusBox.props.uuid), 10000));
  }

  render() {
    return (
      <div className="status-panel">
        {this.state.statusBoxes}
      </div>
    );
  }
}

export default StatusPanel;
