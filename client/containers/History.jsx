import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import marked from 'marked';

const History = ({history}) => (
  <div className="history">
    <h1>History</h1>
    <div className="page-content">
      <div className="iframe-holder">
        <iframe title="Our History" src="https://www.youtube.com/embed/VT3SRGNr22I" />
      </div>

      <div dangerouslySetInnerHTML={{__html: marked(history)}} className="text-holder" />

      <div className="quote">
        “Numbers don’t count. Even if we can change one life, it means a great deal to us.”
        <small>Mrs. Sona Kumar, Sona Sarovar Trust Founder (1954-1994)</small>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  history: state.aboutUs.history
});

History.propTypes = {
  history: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(History);
