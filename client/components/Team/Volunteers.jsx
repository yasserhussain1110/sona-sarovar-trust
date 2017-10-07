import React from 'react';
import {connect} from 'react-redux';
import marked from 'marked';
import PropTypes from 'prop-types';
import {generateRandomHexadecimalStringOfLength as uuid} from '../../lib/helpers/functions';

const Volunteers = ({volunteers}) => (
  <div className="volunteers">
    <h1>Volunteers</h1>
    <div className="page-content">
      {volunteers.map(volunteer => (
        <div key={uuid(10)} className="volunteer-info">
          <div className="img-holder">
            <img alt="" src={volunteer.pic} />
          </div>
          <div className="text-holder">
            <div className="name">
              <h2>{volunteer.name}</h2>
            </div>

            <div className="designation">
              <span>{volunteer.designation}</span>
            </div>

            <div
              className="info rendered-markdown"
              dangerouslySetInnerHTML={{__html: marked(volunteer.info)}}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const mapStateToProps = state => ({
  volunteers: state.team.teamMembers.filter(m => m.type === 'volunteer')
});

Volunteers.propTypes = {
  volunteers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps)(Volunteers);
