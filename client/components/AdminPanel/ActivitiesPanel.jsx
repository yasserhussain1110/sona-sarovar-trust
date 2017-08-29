import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ActivityListPanel from './ActivitiesPanel/ActivityListPanel';
import ActivityAddPanel from './ActivitiesPanel/ActivityAddPanel';
import ActivityEditPanel from './ActivitiesPanel/ActivityEditPanel';

const ProjectsPanel = () => (
  <div className="controller projects-panel">
    <h1>Activities Panel</h1>
    <Switch>
      <Route path="/admin/activities/edit/:index" component={ActivityEditPanel}/>
      <Route path="/admin/activities/add" component={ActivityAddPanel}/>
      <Route path="/admin/activities" component={ActivityListPanel}/>
    </Switch>
  </div>
);

export default ProjectsPanel;
