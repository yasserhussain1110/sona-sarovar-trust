import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updatedHistory, updatedMission, updatedVision} from '../../actions/aboutUs';
import marked from 'marked';
import StatusPanel from '../../lib/components/StatusPanel';
import StatusBox from '../../lib/components/StatusBox';
import MarkdownEditor from '../../lib/components/MarkdownEditor';
import axios from 'axios';

class AboutUsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingModal: false,
      contentToUpdate: "", // one of vision, mission, history
      statusBoxToShow: null
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
  }

  handleSuccess(newContent) {
    const contentToUpdate = this.state.contentToUpdate;

    this.contentToActionMap[contentToUpdate](newContent);

    const statusBoxToShow = (
      <StatusBox success={true}>
        <div><h3>Success!</h3></div>
        <div>{contentToUpdate} updated successfully.</div>
      </StatusBox>
    );

    this.setState({
      showingModal: false,
      contentToUpdate: "",
      statusBoxToShow
    });
  }

  handleFailure() {
    const statusBoxToShow = (
      <StatusBox success={false}>
        <div><h3>Failure!</h3></div>
        <div>{this.state.contentToUpdate} could not be updated.</div>
      </StatusBox>
    );

    this.setState({
      showingModal: false,
      contentToUpdate: "",
      statusBoxToShow
    });
  }

  updateContent(newContent) {
    const requestObj = {};
    requestObj[this.state.contentToUpdate] = newContent;

    axios.patch(`/api/about-us/${this.state.contentToUpdate}`,
      requestObj, {headers: {'x-auth': this.props.authToken}})
      .then(() => {
        this.handleSuccess(newContent);
      })
      .catch(err => {
        console.log(err);
        this.handleFailure();
      })
  }

  back() {
    this.setState({showingModal: false, contentToUpdate: ""});
  }

  updateVisionClick() {
    this.setState({showingModal: true, contentToUpdate: "vision"});
  }

  updateMissionClick() {
    this.setState({showingModal: true, contentToUpdate: "mission"});
  }

  updateHistoryClick() {
    this.setState({showingModal: true, contentToUpdate: "history"});
  }

  getModalContent() {
    if (this.state.showingModal) {
      const content = this.props[this.state.contentToUpdate];
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

  render() {
    const {vision, mission, history} = this.props;
    return (
      <AboutUsPanelView
        {...this.state}
        vision={vision}
        mission={mission}
        history={history}
        updateVisionClick={this.updateVisionClick}
        updateMissionClick={this.updateMissionClick}
        updateHistoryClick={this.updateHistoryClick}
        modalContent={this.getModalContent()}
      />
    );
  }
}

const AboutUsPanelView = ({
                            vision, mission, history, modalContent,
                            updateVisionClick, updateMissionClick,
                            updateHistoryClick, statusBoxToShow
                          }) => (
  <div className="controller about-us-panel">
    <h1>About Us Panel</h1>
    <div className="vision-panel">
      <h2>Vision Panel</h2>
      <div dangerouslySetInnerHTML={{__html: marked(vision)}} className="vision-text-holder"/>
      <div className="button-holder">
        <button onClick={updateVisionClick} className="button update">Update</button>
      </div>
    </div>
    <div className="mission-panel">
      <h2>Mission Panel</h2>
      <div dangerouslySetInnerHTML={{__html: marked(mission)}} className="mission-text-holder"/>
      <div className="button-holder">
        <button onClick={updateMissionClick} className="button update">Update</button>
      </div>
    </div>
    <div className="history-panel">
      <h2>History Panel</h2>
      <div dangerouslySetInnerHTML={{__html: marked(history)}} className="history-text-holder"/>
      <div className="button-holder">
        <button onClick={updateHistoryClick} className="button update">Update</button>
      </div>
    </div>
    {modalContent}
    <StatusPanel statusBoxToAdd={statusBoxToShow}/>
  </div>
);

const mapStateToProps = state => ({
  vision: state.aboutUs.vision,
  mission: state.aboutUs.mission,
  history: state.aboutUs.history,
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {updatedHistory, updatedMission, updatedVision};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsPanel);
