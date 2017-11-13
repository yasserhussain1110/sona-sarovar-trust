import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {
  insertInArray,
  generateRandomHexadecimalStringOfLength as uuid
} from '../lib/helpers/functions';
import {getViewPortWidth} from '../lib/helpers/domHelpers';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAllShowing: false
    };

    this.showAll = this.showAll.bind(this);
  }

  showAll() {
    this.setState({isAllShowing: true});
  }

  render() {
    return (
      <ActivitiesView
        {...this.props}
        isAllShowing={this.state.isAllShowing}
        showAll={this.showAll}
      />);
  }
}

const ActivitiesView = ({match, activitiesUndertaken, isAllShowing, showAll}) => (
  <div className="activities">
    <h1>Our Activities</h1>
    <div className="page-content">
      <div className="explanation">
        <p>
          Some of our activities for children.
        </p>
      </div>
      <div className="activity-list">
        {
          getActivityListContents(match, activitiesUndertaken, isAllShowing, showAll)
        }
      </div>
    </div>
  </div>
);

const getActivityListContents = (match, activities, isAllShowing, showAll) => {
  let activitiesList =
    activities.map((activity, index) => (
      <div
        key={index}
        style={{backgroundImage: `url('${activity.pics[0].url}')`}}
        className="activity-container"
      >
        <NavLink to={`${match.url}/${index}`}>
          <div className="activity-name-holder">
            <span>{activity.name}</span>
          </div>
        </NavLink>
      </div>));

  if (!isAllShowing) {
    const moreButtonIndex = getSeeMoreButtonIndex(activities.length);

    if (moreButtonIndex !== -1) {
      activitiesList = insertInArray(activitiesList,
        <div key={uuid(6)} className="see-all">
          <button onClick={showAll}>See All</button>
        </div>,
        moreButtonIndex
      );
    }
  }

  return activitiesList;
};

const getSeeMoreButtonIndex = numberOfActivites => {
  if (getViewPortWidth() > 1227 && numberOfActivites > 3) {
    return 3;
  } else if (getViewPortWidth() <= 1227 && numberOfActivites > 2) {
    return 2;
  } else {
    return -1;
  }
};

const mapStateToProps = state => (
  {
    activitiesUndertaken: state.activities.activitiesUndertaken
  }
);

Activities.propTypes = {
  activitiesUndertaken: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired
};

ActivitiesView.propTypes = {
  activitiesUndertaken: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  isAllShowing: PropTypes.bool.isRequired,
  showAll: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Activities);
