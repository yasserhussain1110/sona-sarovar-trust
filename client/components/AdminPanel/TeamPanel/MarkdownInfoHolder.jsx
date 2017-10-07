import React from 'react';
import marked from 'marked';

const MarkdownInfoHolder = ({showMarkdownModal, info, infoError, updateInfo}) => (
  <div className="markdown-info-holder">
    <div className="label">
      <label><h3>Info</h3></label>
    </div>
    <div dangerouslySetInnerHTML={{__html: marked(info)}} className="info-holder rendered-markdown"/>
    <div className={`error-holder ${infoError ? "shown" : "hidden"}`}>
      <span className="error">{infoError}</span>
    </div>
    <button onClick={showMarkdownModal} className="md-helper-button">
      Use Markdown helper
    </button>
  </div>
);

export default MarkdownInfoHolder;
