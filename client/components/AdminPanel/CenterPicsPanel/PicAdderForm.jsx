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
    axios.put('/upload', data)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  render() {
    return (
      <Form
        {...this.state}
        uploadFile={this.uploadFile}
        resetErrors={()=>{this.setState({noPicSelected: false, fileNotAPic: false})}}
      />
    );
  }
}


const Form = ({noPicSelected, fileNotAPic, uploadFile, resetErrors}) => (
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
    </form>
  </div>
);

export default PicAdderForm;
