import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

const MarkdownInfoHolder = ({showMarkdownModal, info, infoError}) => (
  <div className="markdown-info-holder">
    <div className="label">
      <label htmlFor="nothing"><h3>Info</h3></label>
    </div>
    <div
      dangerouslySetInnerHTML={{__html: marked(info)}}
      className="info-holder rendered-markdown"
    />
    <div className={`error-holder ${infoError ? 'shown' : 'hidden'}`}>
      <span className="error">{infoError}</span>
    </div>
    <button onClick={showMarkdownModal} className="md-helper-button">
      Use Markdown helper
    </button>
  </div>
);

MarkdownInfoHolder.propTypes = {
  showMarkdownModal: PropTypes.func.isRequired,
  info: PropTypes.string.isRequired,
  infoError: PropTypes.string.isRequired
};

export default MarkdownInfoHolder;
