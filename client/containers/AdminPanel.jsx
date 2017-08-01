import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import BaseContainer from '../components/AdminPanel/BaseContainer';
import BasicSideNav from '../components/AdminPanel/BasicSideNav';
import CenterThemePanel from '../components/AdminPanel/CenterThemePanel';
import InfoPanel from '../components/AdminPanel/InfoPanel';
import ProjectsPanel from '../components/AdminPanel/ProjectsPanel';

const AdminPanel = ({match}) => {
  return (
    <BrowserRouter>
      <main id="admin-panel">
        <div className="admin-panel-wrapper" style={{display: 'flex'}}>
          <BaseContainer style={{background: '#2c3e50', color: '#FFF'}}>
            <BasicSideNav adminMatch={match}/>
          </BaseContainer>
          <Route exact path="/admin/home" component={CenterThemePanel} />
          <Route exact path="/admin/home/center-theme" component={CenterThemePanel}/>
          <Route exact path="/admin/home/info" component={InfoPanel}/>
          <Route exact path="/admin/projects" component={ProjectsPanel} />
        </div>
      </main>
    </BrowserRouter>
  );
};

export default AdminPanel;
