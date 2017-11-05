import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePanel from '../components/AdminPanel/HomePanel';
import AboutUsPanel from '../components/AdminPanel/AboutUsPanel';
import ProjectsPanel from '../components/AdminPanel/ProjectsPanel';
import ActivitiesPanel from '../components/AdminPanel/ActivitiesPanel';
import SideNavContainer from '../components/AdminPanel/SideNavContainer';
import Previewer from '../components/AdminPanel/Previewer';
import TrusteesPanel from '../components/AdminPanel/TrusteesPanel';
import VolunteersPanel from '../components/AdminPanel/VolunteersPanel';
import TechnicalTeamPanel from '../components/AdminPanel/TechnicalTeamPanel';
import AmbassadorPanel from '../components/AdminPanel/AmbassadorPanel';
import AddTeamMemberPanel from '../components/AdminPanel/AddTeamMemberPanel';

const AdminPanel = () => {
  return (
    <main className="admin-panel" id="admin-panel">
      <div className="admin-panel-wrapper" style={{display: 'flex'}}>
        <SideNavContainer />
        <div className="controller-holder">
          <Switch>
            <Route path="/admin/home" component={HomePanel} />
            <Route path="/admin/about" component={AboutUsPanel} />
            <Route path="/admin/projects" component={ProjectsPanel} />
            <Route path="/admin/activities" component={ActivitiesPanel} />
            <Route path="/admin/trustees" component={TrusteesPanel} />
            <Route path="/admin/volunteers" component={VolunteersPanel} />
            <Route path="/admin/technical" component={TechnicalTeamPanel} />
            <Route path="/admin/ambassador" component={AmbassadorPanel} />
            <Route path="/admin/team-member/add" component={AddTeamMemberPanel} />
            <Route path="/admin/preview" component={Previewer} />
            <Route path="/" render={() => <Redirect to="/admin/home" push />} />
          </Switch>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
