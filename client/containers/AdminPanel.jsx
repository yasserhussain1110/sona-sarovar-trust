import React from 'react';
import {Route} from 'react-router-dom';
import HomePanel from '../components/AdminPanel/HomePanel';
import ProjectsPanel from '../components/AdminPanel/ProjectsPanel';
import SideNavContainer from '../components/AdminPanel/SideNavContainer';

const AdminPanel = () => {
  return (
    <main id="admin-panel">
      <div className="admin-panel-wrapper" style={{display: 'flex'}}>
        <SideNavContainer/>
        <div className="controller-holder">
          <Route path="/admin/home" component={HomePanel}/>
          <Route path="/admin/projects" component={ProjectsPanel}/>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
