import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePanel from '../components/AdminPanel/HomePanel';
import ProjectsPanel from '../components/AdminPanel/ProjectsPanel';
import ActivitiesPanel from '../components/AdminPanel/ActivitiesPanel';
import TeamPanel from '../components/AdminPanel/TeamPanel';
import SideNavContainer from '../components/AdminPanel/SideNavContainer';
import Previewer from '../components/AdminPanel/Previewer';

const AdminPanel = () => {
  return (
    <main id="admin-panel">
      <div className="admin-panel-wrapper" style={{display: 'flex'}}>
        <SideNavContainer />
        <div className="controller-holder">
          <Switch>
            <Route path="/admin/home" component={HomePanel} />
            <Route path="/admin/projects" component={ProjectsPanel} />
            <Route path="/admin/activities" component={ActivitiesPanel} />
            <Route path="/admin/team" component={TeamPanel} />
            <Route path="/admin/preview" component={Previewer} />
            <Route path="/" render={() => <Redirect to="/admin/home" push />} />
          </Switch>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
