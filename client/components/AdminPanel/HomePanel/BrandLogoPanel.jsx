import React from 'react';
import {connect} from 'react-redux';
import {updatedBrandLogoUrl} from '../../../actions'
import axios from 'axios';
import handleCommonErrors from '../../../lib/handlers/commonErrorsHandler';

const BrandLogoPanel = ({brandLogoUrl, authToken, updatedBrandLogoUrl}) => (
  <div className="brand-logo-panel">
    <h2>Brand Logo Panel</h2>
    <div className="current-logo">
      <h3>Current Logo</h3>
      <img src={brandLogoUrl}/>
    </div>

    <div className="new-logo">
      <h3>Update Logo</h3>
      <div className="label">
        <label>Select a new picture and click button&nbsp;
          <span className="info">Update Logo</span> to update Logo</label>
      </div>
      <div className="input">
        <input type="file"/>
      </div>
      <div className="button-holder">
        <button onClick={e => updateLogo(authToken, updatedBrandLogoUrl)}>Update Logo</button>
      </div>
    </div>
  </div>
);

const updateLogo = (authToken, updatedBrandLogoUrl) => {
  let fileInput = document.querySelector(".brand-logo-panel input[type=file]");
  let file = fileInput.files[0];
  if (!file) return;

  let data = new FormData();
  data.append('pic', file);

  axios.patch("/api/home-page/brand-logo", data, {headers: {'x-auth': authToken}})
    .then(res => {
      updatedBrandLogoUrl(res.data.url);
    })
    .catch(e => {
      handleCommonErrors(e);
      console.log(e);
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
