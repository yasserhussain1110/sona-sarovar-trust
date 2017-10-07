import React, {Component} from 'react';
import TextFieldsHolder from './TextFieldsHolder';
import PicFieldHolder from './PicFieldHolder';
import axios from 'axios';
import StatusBox from '../../../lib/components/StatusBox';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';
import MarkdownEditor from '../../../lib/components/MarkdownEditor';
import MarkdownInfoHolder from './MarkdownInfoHolder';

class TeamMemberUpdaterForm extends Component {
  constructor(props) {
    super(props);

    let {name, info, designation, pic} = props.member;

    this.state = {
      name,
      info,
      pic,
      designation,
      designationError: "",
      nameError: "",
      infoError: "",
      picError: "",
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
  }

  componentWillReceiveProps(nextProps) {
    let {name, info, pic, designation} = nextProps.member;
    this.setState({name, info, pic, designation});
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

  resetValidationErrors() {
    this.setState({nameError: "", infoError: "", picError: "", designationError:""});
  }

  validateAndUpdateErrorState(e) {
    this.resetValidationErrors();

    const {name, info, designation} = this.state;
    let isValid = true;

    if (!name) {
      this.setState({nameError: "Name cannot be empty"});
      isValid = false;
    }

    if (!info) {
      this.setState({infoError: "Info cannot be empty"});
      isValid = false;
    }

    if (!designation) {
      this.setState({infoError: "Designation cannot be empty"});
      isValid = false;
    }

    const fileList = this.refs.updater.querySelector("input[type=file]").files;

    if (fileList.length > 0) {
      let validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.indexOf(fileList[0]["type"]) === -1) {
        this.setState({
          picError: "Picture must have an image type extension."
        });

        isValid = false;
      }
    }

    return isValid;
  }

  update() {
    if (!this.validateAndUpdateErrorState()) return;

    let fileInput = this.refs.updater.querySelector("input[type=file]");
    let fileList = fileInput.files;


    let formData = new FormData();
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
          <StatusBox success={true}>
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
    let {name, info, pic, designation, nameError, infoError, picError, designationError} = this.state;
    return (
      <section ref="updater" className="team-member-updater">
        <h2 className="team-heading">Member #{this.props.index + 1}</h2>
        <TextFieldsHolder
          name={name}
          designation={designation}
          nameError={nameError}
          designationError={designationError}
          updateName={this.updateName}
          updateDesignation={this.updateDesignation}
        />
        <PicFieldHolder pic={pic} picError={picError}/>
        <MarkdownInfoHolder
          showMarkdownModal={this.showMarkdownModal}
          info={info}
          infoError={infoError}
          updateInfo={this.updateInfo}
        />
        <div className="button-holder">
          <button onClick={this.update}>Update</button>
        </div>
        {this.getModalContent()}
      </section>
    );
  }
}

export default TeamMemberUpdaterForm;
