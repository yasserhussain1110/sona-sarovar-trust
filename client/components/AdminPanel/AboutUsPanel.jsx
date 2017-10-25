import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import marked from 'marked';
import PropTypes from 'prop-types';
import {updatedHistory, updatedMission, updatedVision} from '../../actions/aboutUs';
import StatusPanel from '../../lib/components/StatusPanel';
import StatusBox from '../../lib/components/StatusBox';
import MarkdownEditor from '../../lib/components/MarkdownEditor';

class AboutUsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingModal: false,
      contentToUpdate: '', // one of vision, mission, history
      statusBoxToShow: null,
      vision: props.vision,
      mission: props.mission,
      history: props.history
    };

    this.contentToActionMap = {
      history: props.updatedHistory,
      mission: props.updatedMission,
      vision: props.updatedVision
    };

    this.updateVisionClick = this.updateVisionClick.bind(this);
    this.updateMissionClick = this.updateMissionClick.bind(this);
    this.updateHistoryClick = this.updateHistoryClick.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.back = this.back.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
    this.update = this.update.bind(this);
    this.updateVision = this.update.bind(null, 'vision');
    this.updateMission = this.update.bind(null, 'mission');
    this.updateHistory = this.update.bind(null, 'history');
  }

  componentWillReceiveProps(nextProps) {
    const {vision, mission, history} = nextProps;
    this.setState({vision, mission, history});
  }

  getModalContent() {
    if (this.state.showingModal) {
      const content = this.state[this.state.contentToUpdate];
      return (
        <MarkdownEditor
          markdownContent={content}
          done={this.updateContent}
          back={this.back}
        />
      );
    } else {
      return null;
    }
  }

  handleSuccess(contentToUpdate, newContent) {
    this.contentToActionMap[contentToUpdate](newContent);

    const statusBoxToShow = (
      <StatusBox success>
        <div><h3>Success!</h3></div>
        <div>{contentToUpdate} updated successfully.</div>
      </StatusBox>
    );

    this.setState({
      showingModal: false,
      contentToUpdate: '',
      statusBoxToShow
    });
  }

  update(contentToUpdate) {
    const requestObj = {};
    requestObj[contentToUpdate] = this.state[contentToUpdate];
    axios.patch(`/api/about-us/${contentToUpdate}`,
      requestObj, {headers: {'x-auth': this.props.authToken}})
      .then(() => {
        this.handleSuccess(contentToUpdate, this.state[contentToUpdate]);
      })
      .catch(err => {
        console.log(err);
        this.handleFailure(contentToUpdate);
      });
  }

  handleFailure(contentToUpdate) {
    const statusBoxToShow = (
      <StatusBox success={false}>
        <div><h3>Failure!</h3></div>
        <div>{contentToUpdate} could not be updated.</div>
      </StatusBox>
    );

    this.setState({
      showingModal: false,
      contentToUpdate: '',
      statusBoxToShow
    });
  }

  updateContent(newContent) {
    const subContentObject = {};
    subContentObject[this.state.contentToUpdate] = newContent;
    this.setState({
      ...subContentObject,
      showingModal: false
    });
  }

  back() {
    this.setState({showingModal: false, contentToUpdate: ''});
  }

  updateVisionClick() {
    this.setState({showingModal: true, contentToUpdate: 'vision'});
  }

  updateMissionClick() {
    this.setState({showingModal: true, contentToUpdate: 'mission'});
  }

  updateHistoryClick() {
    this.setState({showingModal: true, contentToUpdate: 'history'});
  }

  render() {
    return (
      <AboutUsPanelView
        {...this.state}
        updateVisionClick={this.updateVisionClick}
        updateMissionClick={this.updateMissionClick}
        updateHistoryClick={this.updateHistoryClick}
        modalContent={this.getModalContent()}
        updateVision={this.updateVision}
        updateMission={this.updateMission}
        updateHistory={this.updateHistory}
      />
    );
  }
}

const AboutUsPanelView = ({
  vision, mission, history, modalContent,
  updateVisionClick, updateMissionClick,
  updateHistoryClick, statusBoxToShow,
  updateVision, updateMission, updateHistory
}) => (
  <div className="controller about-us-panel">
    <h1>About Us Panel</h1>
    <div className="vision-panel">
      <h2>Vision Panel</h2>
      <div
        dangerouslySetInnerHTML={{__html: marked(vision)}}
        className="vision-text-holder rendered-markdown"
      />
      <button onClick={updateVisionClick} className="md-helper-button">
        Use Markdown helper
      </button>
      <div className="button-holder">
        <button onClick={updateVision} className="about-us-button update">Update</button>
      </div>
    </div>
    <div className="mission-panel">
      <h2>Mission Panel</h2>
      <div
        dangerouslySetInnerHTML={{__html: marked(mission)}}
        className="mission-text-holder rendered-markdown"
      />
      <button onClick={updateMissionClick} className="md-helper-button">
        Use Markdown helper
      </button>
      <div className="button-holder">
        <button onClick={updateMission} className="about-us-button update">Update</button>
      </div>
    </div>
    <div className="history-panel">
      <h2>History Panel</h2>
      <div
        dangerouslySetInnerHTML={{__html: marked(history)}}
        className="history-text-holder rendered-markdown"
      />
      <button onClick={updateHistoryClick} className="md-helper-button">
        Use Markdown helper
      </button>
      <div className="button-holder">
        <button onClick={updateHistory} className="about-us-button update">Update</button>
      </div>
    </div>
    {modalContent}
    <StatusPanel statusBoxToAdd={statusBoxToShow} />
  </div>
);

const mapStateToProps = state => ({
  vision: state.aboutUs.vision,
  mission: state.aboutUs.mission,
  history: state.aboutUs.history,
  authToken: state.userAuth.authToken
});

AboutUsPanel.propTypes = {
  vision: PropTypes.string.isRequired,
  mission: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  updatedHistory: PropTypes.func.isRequired,
  updatedMission: PropTypes.func.isRequired,
  updatedVision: PropTypes.func.isRequired
};

AboutUsPanelView.defaultProps = {
  statusBoxToShow: null,
  modalContent: null
};

AboutUsPanelView.propTypes = {
  vision: PropTypes.string.isRequired,
  mission: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
  updateVision: PropTypes.func.isRequired,
  updateMission: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  updateVisionClick: PropTypes.func.isRequired,
  updateMissionClick: PropTypes.func.isRequired,
  updateHistoryClick: PropTypes.func.isRequired,
  modalContent: PropTypes.element,
  statusBoxToShow: PropTypes.element
};

const mapDispatchToProps = {updatedHistory, updatedMission, updatedVision};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsPanel);
