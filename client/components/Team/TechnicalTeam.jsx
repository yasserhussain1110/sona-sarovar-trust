import React from 'react';
import {connect} from 'react-redux';
import marked from 'marked';
import {generateRandomHexadecimalStringOfLength as uuid} from '../../lib/helpers/functions';

const TechnicalTeam = ({technicalTeam}) => (
  <div className="technical-team">
    <h1>Technical Team</h1>
    <div className="page-content">
      {technicalTeam.map(techie => (
        <div key={uuid(10)} className="techie-info">
          <div className="img-holder">
            <img src={techie.pic}/>
          </div>
          <div className="text-holder">
            <div className="name">
              <h2>{techie.name}</h2>
            </div>

            <div className="designation">
              <span>{techie.designation}</span>
            </div>

            <div
              className="info rendered-markdown"
              dangerouslySetInnerHTML={{__html: marked(techie.info)}}/>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const mapStateToProps = state => ({
  technicalTeam: state.team.teamMembers.filter(m => m.type === 'technical'),
});

export default connect(mapStateToProps)(TechnicalTeam);
