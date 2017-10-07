import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {addedActivityUndertaken} from '../../../actions';
import StatusBox from '../../../lib/components/StatusBox';
import StatusPanel from '../../../lib/components/StatusPanel';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';

const createUXState = () => ({
  name: '',
  description: '',
  nameError: '',
  descriptionError: '',
  picsError: ''
});

const createInitState = () => ({
  ...createUXState(),
  statusBoxToAdd: null
});

class ActivityAddPanel extends Component {
  constructor(props) {
    super(props);

    this.state = createInitState();

    this.updateStateField = this.updateStateField.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.setState(createUXState());
    document.getElementById('add-panel-pic').value = null;
  }

  clearValidation() {
    this.setState({nameError: '', descriptionError: '', picsError: ''});
  }

  validateFields() {
    const {name, description} = this.state;
    this.clearValidation();

    let isValid = true;

    if (!name) {
      this.setState({nameError: 'Name field cannot be empty'});
      isValid = false;
    }

    if (!description) {
      this.setState({descriptionError: 'Description field cannot be empty'});
      isValid = false;
    }

    const pics = document.getElementById('add-panel-pic').files;
    if (pics.length === 0) {
      this.setState({picsError: 'Pics field cannot be empty'});
      isValid = false;
    }

    return isValid;
  }

  addSuccessStatusBox(nonPicFileNames) {
    this.setState(() => ({
      statusBoxToAdd: (
        getSuccessStatusBox(nonPicFileNames)
      )
    }));
  }

  addFailureStatusBox() {
    this.setState(() => ({
      statusBoxToAdd: (
        getFailureStatusBox(this.resetForm)
      )
    }));
  }

  addActivity() {
    if (!this.validateFields()) return;

    const {name, description} = this.state;
    const pics = document.getElementById('add-panel-pic').files;

    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    for (let i = 0; i < pics.length; i++) {
      data.append('pics', pics[i]);
    }
    axios.put('/api/activity', data, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        const {nonPicFileNames, activity} = res.data;
        this.resetForm();
        this.addSuccessStatusBox(nonPicFileNames);
        this.props.addedActivityUndertaken(activity);
      })
      .catch(err => {
        console.log(err);
        handleCommonErrors(err);
        this.addFailureStatusBox();
      });
  }

  updateStateField(field, value) {
    const updateObj = {};
    updateObj[field] = value;
    this.setState(updateObj);
  }

  render() {
    return (
      <PanelView
        {...this.state}
        updateStateField={this.updateStateField}
        addActivity={this.addActivity}
        resetForm={this.resetForm}
      />
    );
  }
}

const getFailureStatusBox = resetForm => (
  <StatusBox success={false}>
    <div><h3>Failure!</h3></div>
    <div><p>Could Not Create New Activity.</p></div>
    <div><span><button onClick={resetForm}><strong>Try Again</strong></button></span></div>
  </StatusBox>
);

const getSuccessStatusBox = nonPicFileNames => {
  return (
    <StatusBox success>
      <div><h3>Success!</h3></div>
      <div><p>New Activity Created Successfully.</p></div>
      <div className={`non-saved-files ${nonPicFileNames.length > 0 ? 'show-non-saved-files' : ''}`}>
        <p>However these files could not be saved as they are not pictures.</p>
        <ol>{nonPicFileNames.map((fileName, index) => (
          <li key={index}>{fileName}</li>))}
        </ol>
      </div>
      <div>
        <span>
          <p>
            <NavLink to="/admin/activities">
              <strong>Redirect</strong>
            </NavLink> to activity list to see the newly added Activity!
          </p>
        </span>
      </div>
    </StatusBox>
  );
};

const PanelView = ({
  name, description, nameError, descriptionError,
  picsError, updateStateField, addActivity, statusBoxToAdd
}) => (
  <div className="project-add-panel">
    <h2>Add an Activity</h2>
    <ActivityAddForm
      name={name}
      description={description}
      nameError={nameError}
      descriptionError={descriptionError}
      picsError={picsError}
      updateStateField={updateStateField}
      addActivity={addActivity}
    />

    <StatusPanel statusBoxToAdd={statusBoxToAdd} />
  </div>
);

const ActivityAddForm = ({
  name, description, nameError, descriptionError,
  picsError, updateStateField, addActivity
}) => (
  <div className="form-holder">
    <section className="name">
      <div className="field">
        <div className="label">
          <label htmlFor="activity-add-name">Name</label>
        </div>

        <div className="input">
          <input
            id="activity-add-name"
            type="text"
            value={name}
            onChange={e => updateStateField('name', e.target.value)}
          />
        </div>
      </div>

      <div className={`field-error ${nameError ? 'show-field-error' : ''}`}>
        {nameError}
      </div>
    </section>

    <section className="description">
      <div className="field">
        <div className="label">
          <label htmlFor="activity-description">Description</label>
        </div>

        <div className="input">
          <textarea
            id="activity-description"
            value={description}
            onChange={e => updateStateField('description', e.target.value)}
          />
        </div>
      </div>

      <div className={`field-error ${descriptionError ? 'show-field-error' : ''}`}>
        {descriptionError}
      </div>
    </section>

    <section className="pics">
      <div className="field">
        <div className="label">
          <label htmlFor="add-panel-pic">Pictures</label>
        </div>

        <div className="input">
          <input id="add-panel-pic" type="file" multiple />
        </div>
      </div>

      <div className={`field-error ${picsError ? 'show-field-error' : ''}`}>
        {picsError}
      </div>
    </section>

    <section className="button-holder">
      <button onClick={addActivity}>Add</button>
    </section>
  </div>
);

const mapStateToProps = state => (
  {
    authToken: state.userAuth.authToken
  }
);

const mapDispatchToProps = {addedActivityUndertaken};

ActivityAddPanel.propTypes = {
  addedActivityUndertaken: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired
};

ActivityAddForm.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  nameError: PropTypes.string.isRequired,
  descriptionError: PropTypes.string.isRequired,
  picsError: PropTypes.string.isRequired,
  updateStateField: PropTypes.func.isRequired,
  addActivity: PropTypes.func.isRequired
};

PanelView.defaultProps = {
  statusBoxToAdd: null
};

PanelView.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  nameError: PropTypes.string.isRequired,
  descriptionError: PropTypes.string.isRequired,
  picsError: PropTypes.string.isRequired,
  updateStateField: PropTypes.func.isRequired,
  addActivity: PropTypes.func.isRequired,
  statusBoxToAdd: PropTypes.element
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityAddPanel);
