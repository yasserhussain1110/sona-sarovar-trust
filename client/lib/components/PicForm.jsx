import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import handleCommonErrors from '../../lib/handlers/commonErrorsHandler';

class PicForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noPicSelected: false,
      fileNotAPic: false
    };

    this.uploadPic = this.uploadPic.bind(this);
    this.putPic = this.putPic.bind(this);
    this.patchPic = this.patchPic.bind(this);
    this.close = this.close.bind(this);
  }

  close(e) {
    e.preventDefault();
    this.props.close();
  }

  validatePicAndUpdateState(file) {
    if (!file) {
      this.setState({
        noPicSelected: true
      });

      return false;
    }

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (validImageTypes.indexOf(file.type) === -1) {
      this.setState({
        fileNotAPic: true
      });

      return false;
    }

    return true;
  }

  putPic() {
    const pic = document.getElementById('pic').files[0];
    if (!this.validatePicAndUpdateState(pic)) {
      return;
    }
    const data = new FormData();
    data.append('pic', pic);
    axios.put(this.props.url, data, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        this.props.onSuccess(res.data);
      })
      .catch(err => {
        handleCommonErrors(err);
        console.log(err);
        if (this.props.onFailure) this.props.onFailure();
      });
  }

  patchPic() {
    const pic = document.getElementById('pic').files[0];
    if (!this.validatePicAndUpdateState(pic)) {
      return;
    }
    const data = new FormData();
    data.append('pic', pic);
    axios.patch(this.props.url, data, {headers: {'x-auth': this.props.authToken}})
      .then(res => {
        this.props.onSuccess(res.data);
      })
      .catch(err => {
        handleCommonErrors(err);
        console.log(err);
        if (this.props.onFailure) this.props.onFailure();
      });
  }

  uploadPic(e) {
    e.preventDefault();
    if (this.props.mode === 'add') {
      this.putPic();
    } else {
      this.patchPic();
    }
  }

  render() {
    return (
      <Form
        {...this.state}
        uploadPic={this.uploadPic}
        close={this.close}
        resetErrors={() => (this.setState({noPicSelected: false, fileNotAPic: false}))}
      />
    );
  }
}

const Form = ({noPicSelected, fileNotAPic, uploadPic, resetErrors, close}) => (
  <div className="pic-upload-form">
    <form>
      <div className="selection form-control">
        <label htmlFor="pic">Select Pic</label>
        <input id="pic" name="pic" type="file" onChange={resetErrors} />
      </div>

      <div className={`error uploading-without-pic ${noPicSelected ? '' : 'hidden'}`}>
        <span>Please select a picture to continue uploading</span>
      </div>

      <div className={`error file-not-pic ${fileNotAPic ? '' : 'hidden'}`}>
        <span>Must upload a picture</span>
      </div>

      <div className="button-holder">
        <div className="form-control">
          <button onClick={uploadPic}>Upload</button>
        </div>

        <div className="form-control">
          <button onClick={close}>Close</button>
        </div>
      </div>
    </form>
  </div>
);

PicForm.defaultProps = {
  onFailure: null
};

PicForm.propTypes = {
  authToken: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['update', 'add']).isRequired,
  url: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func
};

Form.propTypes = {
  noPicSelected: PropTypes.bool.isRequired,
  fileNotAPic: PropTypes.bool.isRequired,
  uploadPic: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default PicForm;
