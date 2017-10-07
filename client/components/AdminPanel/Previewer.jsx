import React from 'react';
import SvgIcon from 'react-icons-kit';
import {arrowLeft, eye} from 'react-icons-kit/fa';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Web from '../../routes/Web';

const Previewer = ({match, history}) => (
  <div className="previewer">
    <div className="preview-note">
      <div className="main">
        <span>You are viewing site in
          <SvgIcon size={15} icon={eye} /> Preview mode.
        </span>
      </div>
      <div className="warn">
        <span>
          Note:- Site as viewed in <SvgIcon size={12} icon={eye} /> Preview
          mode may not be exactly same as the actual site.
        </span>
      </div>
    </div>
    <div className="nav">
      <button onClick={() => history.push('/admin/home')}>
        <div className="icon-holder"><SvgIcon size={20} icon={arrowLeft} /></div>
        <div className="caption-holder"><span>Home</span></div>
      </button>
    </div>
    <div className="body">
      <Web match={match} />
    </div>
  </div>
);

Previewer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Previewer);
