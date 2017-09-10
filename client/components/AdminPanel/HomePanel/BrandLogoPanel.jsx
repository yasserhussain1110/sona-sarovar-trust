import React from 'react';
import {connect} from 'react-redux';
import {updatedBrandLogoUrl} from '../../../actions'
import axios from 'axios';
import StatusBox from '../../../lib/components/StatusBox';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';

const BrandLogoPanel = ({brandLogoUrl, authToken, updatedBrandLogoUrl, addStatusBox}) => (
  <div className="brand-logo-panel">
    <h2>Brand Logo Panel</h2>
    <div className="current-logo">
      <h3>Current Logo</h3>
      <img src={brandLogoUrl}/>
    </div>

    <div className="new-logo">
      <h3>Update Logo</h3>
      <div className="label">
        <label>Select a new picture and click <span className="info">Update Logo</span> to update Logo</label>
      </div>
      <div className="input">
        <input type="file"/>
      </div>
      <div className="button-holder">
        <button onClick={e => updateLogo(authToken, updatedBrandLogoUrl, addStatusBox)}>Update Logo</button>
      </div>
    </div>
  </div>
);

const updateLogo = (authToken, updatedBrandLogoUrl, addStatusBox) => {
  let fileInput = document.querySelector(".brand-logo-panel input[type=file]");
  let file = fileInput.files[0];
  if (!file) return;

  let data = new FormData();
  data.append('pic', file);

  axios.patch("/api/home-page/brand-logo", data, {headers: {'x-auth': authToken}})
    .then(res => {
      updatedBrandLogoUrl(res.data.url);
      addStatusBox(
        <StatusBox success={true}>
          <div><h3>Success!</h3></div>
          <div>Brand Logo Updated Successfully.</div>
        </StatusBox>
      );
    })
    .catch(e => {
      console.log(e);
      handleCommonErrors(e);
      addStatusBox(
        <StatusBox success={false}>
          <div><h3>Failure!</h3></div>
          <div>Could not update Logo.</div>
        </StatusBox>
      );
    });

  fileInput.value = null;
};

const mapStateToProps = state => (
  {
    brandLogoUrl: state.home.brandLogoUrl,
    authToken: state.userAuth.authToken
  }
);

const mapDispatchToProps = {updatedBrandLogoUrl};

export default connect(mapStateToProps, mapDispatchToProps)(BrandLogoPanel);
