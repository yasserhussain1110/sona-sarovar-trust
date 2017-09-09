import React, {Component} from 'react';
import TextFieldsHolder from './TextFieldsHolder';
import PicFieldHolder from './PicFieldHolder';
import axios from 'axios';
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
      infoError: ""
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
    this.setState({nameError: "", infoError: ""});
  }

  validateAndUpdateErrorState() {
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

    return isValid;
  }

  update(e) {
    let fileInput = getFileInputCorrespondingToForm(e);
    let fileList = fileInput.files;
    if (!this.validateAndUpdateErrorState()) return;

    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('info', this.state.info);

    if (fileList.length > 0) {
      formData.append('pic', fileList[0]);
    }

    axios.patch(`/api/teammember/${this.props.member._id}`, formData, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        this.props.updatedTeamMember(res.data);
      })
      .catch(err => {
        handleCommonErrors(err);
        console.log(err);
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
    let {name, info, pic, nameError, infoError} = this.state;
    return (
      <section className="team-member-updater">
        <TextFieldsHolder
          name={name}
          info={info}
          nameError={nameError}
          infoError={infoError}
          updateName={this.updateName}
          updateInfo={this.updateInfo}
        />
        <PicFieldHolder pic={pic}/>
        <div className="button-holder">
          <button onClick={this.update}>Update</button>
        </div>
      </section>
    );
  }
}

export default TeamMemberUpdater;
