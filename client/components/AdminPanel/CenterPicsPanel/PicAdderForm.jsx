import React, {Component} from 'react';
import axios from 'axios';

class PicAdderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noPicSelected: false,
      fileNotAPic: false
    };

    this.uploadFile = this.uploadFile.bind(this);
    this.goBack = this.goBack.bind(this);
    this.test2 = this.test2.bind(this);
  }

  goBack(e) {
    e.preventDefault();
    this.props.goBack();
  }

  validatePicAndUpdateState(file) {
    if (!file) {
      this.setState({
        noPicSelected: true
      });

      return false;
    }

    let validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.indexOf(file["type"]) === -1) {
      this.setState({
        fileNotAPic: true
      });

      return false;
    }

    return true;
  }

  uploadFile(e) {
    e.preventDefault();
    let pic = document.getElementById('pic').files[0];
    if (!this.validatePicAndUpdateState(pic)) {
      return;
    }
    let data = new FormData();
    data.append('pic', pic);
    axios.put('/home-page/center-pic', data, {headers: {'x-auth': this.props.authToken}})
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  test2() {
    let pic = document.getElementById('pic').files[0];
    let data = new FormData();
    data.append('pic', pic);
    axios.patch('/home-page/center-pic/59846979fdaf136d969f8b9f', data, {headers: {'x-auth': this.props.authToken}})
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    return (
      <Form
        {...this.state}
        uploadFile={this.uploadFile}
        goBack={this.goBack}
        resetErrors={() => (this.setState({noPicSelected: false, fileNotAPic: false}))}
        test2={this.test2}
      />
    );
  }
}


const Form = ({noPicSelected, fileNotAPic, uploadFile, resetErrors, goBack, test2}) => (
  <div className="pic-adder-form">
    <form>
      <div className="form-control">
        <label>Select Pic</label>
        <input id="pic" name="pic" type="file" onChange={resetErrors}/>
      </div>

      <div className={`error uploading-without-pic ${noPicSelected ? "shown" : "hidden" }`}>
        <span>Please select a picture to continue uploading</span>
      </div>

      <div className={`error file-not-pic ${fileNotAPic ? "shown" : "hidden"}`}>
        <span>Must upload a picture</span>
      </div>

      <div className="form-control">
        <button onClick={uploadFile}>Upload</button>
      </div>

      <div className="form-control">
        <button onClick={goBack}>Back</button>
      </div>
    </form>

    <button onClick={test2}>I am test 2</button>
  </div>
);

export default PicAdderForm;
