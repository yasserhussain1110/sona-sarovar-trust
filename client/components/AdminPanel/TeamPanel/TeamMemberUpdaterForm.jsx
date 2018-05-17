import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextFieldsHolder from './TextFieldsHolder';
import PicFieldHolder from './PicFieldHolder';
import StatusBox from '../../../lib/components/StatusBox';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';
import MarkdownEditor from '../../../lib/components/MarkdownEditor';
import MarkdownInfoHolder from './MarkdownInfoHolder';

class TeamMemberUpdaterForm extends Component {
  constructor(props) {
    super(props);

    const {name, info, designation, pic} = props.member;


    this.state = {
      name,
      info,
      pic,
      designation,
      designationError: '',
      nameError: '',
      infoError: '',
      picError: '',
      showingModal: false
    };

    this.updateName = this.updateName.bind(this);
    this.updateDesignation = this.updateDesignation.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.update = this.update.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.showMarkdownModal = this.showMarkdownModal.bind(this);
    this.back = this.back.bind(this);
    this.markdownUpdate = this.markdownUpdate.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {name, info, pic, designation} = nextProps.member;
    this.setState({name, info, pic, designation});
  }

  getModalContent() {
    if (this.state.showingModal) {
      return (
        <MarkdownEditor
          markdownContent={this.state.info}
          done={this.markdownUpdate}
          back={this.back}
        />
      );
    } else {
      return null;
    }
  }

  markdownUpdate(newInfo) {
    this.updateInfo(newInfo);
    this.back();
  }

  back() {
    this.setState({showingModal: false});
  }

  showMarkdownModal() {
    this.setState({showingModal: true});
  }

  resetValidationErrors() {
    this.setState({nameError: '', infoError: '', picError: '', designationError: ''});
  }

  validateAndUpdateErrorState() {
    this.resetValidationErrors();

    const {name, info} = this.state;

    let isValid = true;

    if (!name) {
      this.setState({nameError: 'Name cannot be empty'});
      isValid = false;
    }

    if (!info) {
      this.setState({infoError: 'Info cannot be empty'});
      isValid = false;
    }

    const fileList = this.updaterForm.querySelector('input[type=file]').files;

    if (fileList.length > 0) {
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.indexOf(fileList[0].type) === -1) {
        this.setState({
          picError: 'Picture must have an image type extension.'
        });

        isValid = false;
      }
    }

    return isValid;
  }


  update() {
    if (!this.validateAndUpdateErrorState()) return;

    const fileInput = this.updaterForm.querySelector('input[type=file]');
    const fileList = fileInput.files;

    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('info', this.state.info);
    formData.append('designation', this.state.designation);

    if (fileList.length > 0) {
      formData.append('pic', fileList[0]);
    }

    axios.patch(`/api/teammember/${this.props.member._id}`, formData, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        this.props.updatedTeamMember(res.data);
        this.props.addStatusBox(
          <StatusBox success>
            <div><h3>Success!</h3></div>
            <div>Info updated for {this.props.member.name} successfully.</div>
          </StatusBox>
        );
      })
      .catch(err => {
        handleCommonErrors(err);
        console.log(err);
        this.props.addStatusBox(
          <StatusBox success={false}>
            <div><h3>Failure!</h3></div>
            <div>Info update for {this.props.member.name} failed.</div>
          </StatusBox>
        );
      });

    fileInput.value = null;
  }

  delete() {
    axios.delete(`/api/teammember/${this.props.member._id}`, {headers: {'x-auth': this.props.authToken}})
      .then(() => {
        this.props.deletedTeamMember(this.props.member);
        this.props.addStatusBox(
          <StatusBox success>
            <div><h3>Success!</h3></div>
            <div>Team member {this.props.member.name} removed successfully.</div>
          </StatusBox>
        );
      })
      .catch(err => {
        handleCommonErrors(err);
        console.log(err);
        this.props.addStatusBox(
          <StatusBox success={false}>
            <div><h3>Failure!</h3></div>
            <div>Team member {this.props.member.name} could not be removed.</div>
          </StatusBox>
        );
      });
  }

  updateName(e) {
    this.setState({name: e.target.value});
  }

  updateInfo(newInfo) {
    this.setState({info: newInfo});
  }

  updateDesignation(e) {
    this.setState({designation: e.target.value});
  }

  render() {
    const {
      name, info, pic, designation, nameError, infoError, picError, designationError
    } = this.state;

    return (
      <section
        className="team-member-updater"
        ref={ref => { this.updaterForm = ref; }}
      >
        <h2 className="team-heading">Member #{this.props.index + 1}</h2>
        <TextFieldsHolder
          name={name}
          designation={designation}
          nameError={nameError}
          designationError={designationError}
          updateName={this.updateName}
          updateDesignation={this.updateDesignation}
          designationRequired={this.props.designationRequired}
        />

        <PicFieldHolder pic={pic} picError={picError} />
        <MarkdownInfoHolder
          showMarkdownModal={this.showMarkdownModal}
          info={info}
          infoError={infoError}
        />

        <div className="button-holder">
          <button onClick={this.update}>Update</button>
          <button onClick={this.delete}>Delete</button>
        </div>
        {this.getModalContent()}
      </section>
    );
  }
}

TeamMemberUpdaterForm.defaultProps = {
  designationRequired: true
};

TeamMemberUpdaterForm.propTypes = {
  member: PropTypes.object.isRequired,
  authToken: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  updatedTeamMember: PropTypes.func.isRequired,
  addStatusBox: PropTypes.func.isRequired,
  designationRequired: PropTypes.bool,
  deletedTeamMember: PropTypes.func.isRequired
};

export default TeamMemberUpdaterForm;
