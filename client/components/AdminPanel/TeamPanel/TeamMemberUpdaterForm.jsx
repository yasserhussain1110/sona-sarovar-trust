import React, {Component} from 'react';
import TextFieldsHolder from './TextFieldsHolder';
import PicFieldHolder from './PicFieldHolder';
import axios from 'axios';
import StatusBox from '../../../lib/components/StatusBox';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';

const getFileInputCorrespondingToForm = e =>
  e.target.parentElement.parentElement.querySelector("input[type='file']");

class TeamMemberUpdater extends Component {
  constructor(props) {
    super(props);

    let {name, info, pic} = props.member;

    this.state = {
      name,
      info,
      pic,
      nameError: "",
      infoError: "",
      picError: ""
    };

    this.updateName = this.updateName.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let {name, info, pic} = nextProps.member;
    this.setState({name, info, pic});
  }

  resetValidationErrors() {
    this.setState({nameError: "", infoError: "", picError: ""});
  }

  validateAndUpdateErrorState(e) {
    this.resetValidationErrors();

    let {name, info} = this.state;
    let isValid = true;

    if (!name) {
      this.setState({nameError: "Name cannot be empty"});
      isValid = false;
    }

    if (!info) {
      this.setState({infoError: "Info cannot be empty"});
      isValid = false;
    }

    let fileInput = getFileInputCorrespondingToForm(e);
    let fileList = fileInput.files;

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

  update(e) {
    let fileInput = getFileInputCorrespondingToForm(e);
    let fileList = fileInput.files;
    if (!this.validateAndUpdateErrorState(e)) return;

    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('info', this.state.info);

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

  updateInfo(e) {
    this.setState({info: e.target.value});
  }

  render() {
    let {name, info, pic, nameError, infoError, picError} = this.state;
    return (
      <section className="team-member-updater">
        <h2>Member #{this.props.index + 1}</h2>
        <TextFieldsHolder
          name={name}
          info={info}
          nameError={nameError}
          infoError={infoError}
          updateName={this.updateName}
          updateInfo={this.updateInfo}
        />
        <PicFieldHolder pic={pic} picError={picError}/>
        <div className="button-holder">
          <button onClick={this.update}>Update</button>
        </div>
      </section>
    );
  }
}

export default TeamMemberUpdater;
