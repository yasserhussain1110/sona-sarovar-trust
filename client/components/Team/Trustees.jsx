import React from 'react';
import {connect} from 'react-redux';
import marked from 'marked';
import {generateRandomHexadecimalStringOfLength as uuid} from '../../lib/helpers/functions';

const Trustees = ({trustees}) => (
  <div className="trustees">
    <h1>Trustees</h1>
    <div className="page-content">
      {trustees.map(trustee => (
        <div key={uuid(10)} className="trustee-info">
          <div className="img-holder">
            <img src={trustee.pic}/>
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
              dangerouslySetInnerHTML={{__html: marked(trustee.info)}}/>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const mapStateToProps = state => ({
  trustees: state.team.teamMembers.filter(m => m.type === 'trustee'),
});

export default connect(mapStateToProps)(Trustees);
