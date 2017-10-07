import React from 'react';
import {connect} from 'react-redux';
import marked from 'marked';
import {generateRandomHexadecimalStringOfLength as uuid} from '../../lib/helpers/functions';

const BrandAmbassador = ({ambassadors}) => (
  <div className="brand-ambassador">
    <h1>Our Brand Ambassador</h1>
    <div className="page-content">
      {ambassadors.map(ambassador => (
        <div key={uuid(10)} className="brand-ambassador-info">
          <div className="img-holder">
            <img src={ambassador.pic}/>
          </div>
          <div className="text-holder">
            <div className="name">
              <h2>{ambassador.name}</h2>
            </div>

            <div className="designation">
              <span>{ambassador.designation}</span>
            </div>

            <div
              className="info rendered-markdown"
              dangerouslySetInnerHTML={{__html: marked(ambassador.info)}}/>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const mapStateToProps = state => ({
  ambassadors: state.team.teamMembers.filter(m => m.type === 'ambassador'),
});

export default connect(mapStateToProps)(BrandAmbassador);
