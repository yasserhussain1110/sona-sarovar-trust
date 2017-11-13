import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {
  insertInArray,
  generateRandomHexadecimalStringOfLength as uuid
} from '../lib/helpers/functions';
import {getViewPortWidth} from '../lib/helpers/domHelpers';

class Projects extends Component {
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
      <ProjectsView
        {...this.props}
        isAllShowing={this.state.isAllShowing}
        showAll={this.showAll}
      />);
  }
}

const ProjectsView = ({match, projectsDone, isAllShowing, showAll}) => (
  <div className="projects">
    <h1>Our Projects</h1>
    <div className="page-content">
      <div className="explanation">
        <p>
          Some of our projects for children.
        </p>
      </div>
      <div className="project-list">
        {
          getProjectListContents(match, projectsDone, isAllShowing, showAll)
        }
      </div>
    </div>
  </div>
);

const getProjectListContents = (match, projects, isAllShowing, showAll) => {
  let projectsList =
    projects.map((project, index) => (
      <div
        key={index}
        style={{backgroundImage: `url('${project.pics[0].url}')`}}
        className="project-container"
      >
        <NavLink to={`${match.url}/${index}`}>
          <div className="project-name-holder">
            <span>{project.name}</span>
          </div>
        </NavLink>
      </div>));

  const moreButtonIndex = getSeeMoreButtonIndex(projects.length);

  if (moreButtonIndex !== -1) {
    projectsList = insertInArray(projectsList,
      <div key={uuid(6)} className="see-all">
        <button onClick={showAll}>See All</button>
      </div>,
      moreButtonIndex
    );
  }

  return projectsList;
};

const getSeeMoreButtonIndex = numberOfProjects => {
  if (getViewPortWidth() > 1227 && numberOfProjects > 3) {
    return 3;
  } else if (getViewPortWidth() <= 1227 && numberOfProjects > 2) {
    return 2;
  } else {
    return -1;
  }
};

const mapStateToProps = state => (
  {
    projectsDone: state.projects.projectsDone
  }
);

Projects.propTypes = {
  projectsDone: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired
};

ProjectsView.propTypes = {
  projectsDone: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  isAllShowing: PropTypes.bool.isRequired,
  showAll: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Projects);
