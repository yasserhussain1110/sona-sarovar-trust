import React from 'react';
import {connect} from 'react-redux';
import marked from 'marked';
import PropTypes from 'prop-types';
import {generateRandomHexadecimalStringOfLength as uuid} from '../../lib/helpers/functions';

const Trustees = ({trustees}) => (
  <div className="team-members">
    <h1>Trustees</h1>
    <div className="page-content">
      {trustees.map(trustee => (
        <div key={uuid(10)} className="team-member-info">
          <div className="img-holder">
            <img alt="" src={trustee.pic} />
          </div>
          <div className="text-holder">
            <div className="name">
              <h2>{trustee.name}</h2>
            </div>

            <div className="designation">
              <span>{trustee.designation}</span>
            </div>

            <div
              className="info rendered-markdown"
              dangerouslySetInnerHTML={{__html: marked(trustee.info)}}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const mapStateToProps = state => ({
  trustees: state.team.teamMembers.filter(m => m.type === 'trustee')
});

Trustees.propTypes = {
  trustees: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default connect(mapStateToProps)(Trustees);
