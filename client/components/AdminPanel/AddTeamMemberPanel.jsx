import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MarkdownInfoHolder from './TeamPanel/MarkdownInfoHolder';
import {getParameterByName} from '../../lib/helpers/functions';
import MarkdownEditor from '../../lib/components/MarkdownEditor';
import StatusBox from '../../lib/components/StatusBox';
import StatusPanel from '../../lib/components/StatusPanel';
import {addedTeamMember} from '../../actions/team';
import handleCommonErrors from '../../lib/handlers/commonErrorsHandler';

class AddTeamMemberPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameError: '',
      designation: '',
      designationError: '',
      info: '',
      infoError: '',
      picError: '',
      type: '',
      statusBoxToAdd: null
    };

    this.updateField = this.updateField.bind(this);
    this.updateName = this.updateField.bind(null, 'name');
    this.updateDesignation = this.updateField.bind(null, 'designation');
    this.getModalContent = this.getModalContent.bind(this);
    this.showMarkdownModal = this.showMarkdownModal.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.back = this.back.bind(this);
    this.addStatusBox = this.addStatusBox.bind(this);
    this.addTeamMember = this.addTeamMember.bind(this);
    this.addTeamMemberPanelRef = this.addTeamMemberPanelRef.bind(this);
  }

  componentWillMount() {
    const type = getParameterByName('type');
    this.setState({type});
  }

  getModalContent() {
    if (this.state.showingModal) {
      return (
        <MarkdownEditor
          markdownContent={this.state.info}
          done={this.updateInfo}
          back={this.back}
        />
      );
    } else {
      return null;
    }
  }

  addStatusBox(statusBox) {
    this.setState({statusBoxToAdd: statusBox});
  }

  back() {
    this.setState({showingModal: false});
  }

  showMarkdownModal() {
    this.setState({showingModal: true});
  }

  resetValidationErrors() {
    this.setState({nameError: '', designationError: '', picError: '', infoError: ''});
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

    const fileList = this.addTeamMemberPanel.querySelector('input[type=file]').files;

    if (fileList.length === 0) {
      this.setState({picError: 'Must select a pic.'});
      isValid = false;
    }

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

  addTeamMember() {
    if (!this.validateAndUpdateErrorState()) return;

    const fileInput = this.addTeamMemberPanel.querySelector('input[type=file]');
    const fileList = fileInput.files;


    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('info', this.state.info);
    formData.append('type', this.state.type);
    formData.append('designation', this.state.designation);

    if (fileList.length > 0) {
      formData.append('pic', fileList[0]);
    }

    axios.put('/api/teammember', formData, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        this.props.addedTeamMember(res.data);
        this.addStatusBox(
          <StatusBox success>
            <div><h3>Success!</h3></div>
            <div>Team Member added successfully.</div>
          </StatusBox>
        );
        this.setState({name: '', designation: '', info: ''});
        fileInput.value = null;
      })
      .catch(err => {
        handleCommonErrors(err);
        console.log(err);
        this.addStatusBox(
          <StatusBox success={false}>
            <div><h3>Failure!</h3></div>
            <div>Team Member could not be added.</div>
          </StatusBox>
        );
      });
  }

  updateInfo(newInfo) {
    this.setState({info: newInfo, showingModal: false});
  }

  updateField(fieldName, e) {
    const obj = {};
    obj[fieldName] = e.target.value;
    this.setState(obj);
  }

  addTeamMemberPanelRef(ref) {
    this.addTeamMemberPanel = ref;
  }

  render() {
    return (
      <AddTeamMemberPanelView
        {...this.state}
        updateName={this.updateName}
        updateDesignation={this.updateDesignation}
        getModalContent={this.getModalContent}
        showMarkdownModal={this.showMarkdownModal}
        addTeamMember={this.addTeamMember}
        addTeamMemberPanelRef={this.addTeamMemberPanelRef}
      />
    );
  }
}

const AddTeamMemberPanelView = ({
  name, nameError, designation, designationError, info, infoError,
  picError, updateName, updateDesignation, getModalContent, showMarkdownModal,
  type, statusBoxToAdd, addTeamMember, addTeamMemberPanelRef
}) => (
  <div
    ref={addTeamMemberPanelRef}
    className="controller add-team-member-panel"
  >
    <h1>Add Team Member Panel</h1>
    <div className="team-meber-adder-wrapper">
      <h2>Add {type}</h2>
      <div className="form-holder">
        <section className="name">
          <div className="field">
            <div className="label">
              <label htmlFor="team-member-name">Name</label>
            </div>

            <div className="input">
              <input id="team-member-name" type="text" value={name} onChange={updateName} />
            </div>
          </div>

          <div className={`field-error ${nameError ? 'show-field-error' : ''}`}>
            {nameError}
          </div>
        </section>

        <section className="designation">
          <div className="field">
            <div className="label">
              <label htmlFor="team-member-designation">Designation</label>
            </div>

            <div className="input">
              <input
                id="team-member-designation"
                type="text"
                value={designation}
                onChange={updateDesignation}
              />
            </div>
          </div>

          <div className={`field-error ${designationError ? 'show-field-error' : ''}`}>
            {designationError}
          </div>
        </section>

        <section className="type">
          <div className="field">
            <div className="label">
              <label htmlFor="team-member-type">Type</label>
            </div>

            <div className="input">
              <select id="team-member-type" disabled defaultValue={type}>
                <option value="trustee">Trustee</option>
                <option value="volunteer">Volunteer
                </option>
                <option value="technical">
                  Technical Team
                </option>
                <option value="ambassador">
                  Brand Ambassador
                </option>
              </select>
            </div>
          </div>
        </section>

        <section className="info">
          <div className="field md-field">
            <MarkdownInfoHolder
              showMarkdownModal={showMarkdownModal}
              info={info}
              infoError={infoError}
            />
          </div>
        </section>

        <section className="pic">
          <div className="field">
            <div className="label">
              <label htmlFor="team-member-pic">Picture</label>
            </div>

            <div className="input">
              <input id="team-member-pic" type="file" />
            </div>
          </div>

          <div className={`field-error ${picError ? 'show-field-error' : ''}`}>
            {picError}
          </div>
        </section>

        <section className="button-holder">
          <button onClick={addTeamMember}>Add</button>
        </section>
      </div>

      {getModalContent()}
      <StatusPanel statusBoxToAdd={statusBoxToAdd} />
    </div>
  </div>
);

AddTeamMemberPanel.propTypes = {
  addedTeamMember: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired
};

AddTeamMemberPanelView.defaultProps = {
  statusBoxToAdd: null
};

AddTeamMemberPanelView.propTypes = {
  name: PropTypes.string.isRequired,
  nameError: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  designationError: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  infoError: PropTypes.string.isRequired,
  picError: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
  updateDesignation: PropTypes.func.isRequired,
  getModalContent: PropTypes.func.isRequired,
  addTeamMember: PropTypes.func.isRequired,
  showMarkdownModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  addTeamMemberPanelRef: PropTypes.func.isRequired,
  statusBoxToAdd: PropTypes.element
};

const mapStateToProps = state => ({
  authToken: state.userAuth.authToken
});

const mapDispatchToProps = {addedTeamMember};

export default connect(mapStateToProps, mapDispatchToProps)(AddTeamMemberPanel);
