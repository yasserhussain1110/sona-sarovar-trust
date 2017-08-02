import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import BaseContainer from '../components/AdminPanel/BaseContainer';
import BasicSideNav from '../components/AdminPanel/BasicSideNav';
import CenterPicsPanel from '../components/AdminPanel/CenterPicsPanel';
import CaptionsPanel from '../components/AdminPanel/CaptionsPanel';
import MainTextsPanel from '../components/AdminPanel/MainTextsPanel';
import ProjectsPanel from '../components/AdminPanel/ProjectsPanel';

const AdminPanel = ({match}) => {
  return (
    <BrowserRouter>
      <main id="admin-panel">
        <div className="admin-panel-wrapper" style={{display: 'flex'}}>
          <BaseContainer style={{background: '#2c3e50', color: '#FFF'}}>
            <BasicSideNav adminMatch={match}/>
          </BaseContainer>
          <div className="controller-holder">
            <Route exact path="/admin/home" component={CenterPicsPanel} />
            <Route exact path="/admin/home/center-pics" component={CenterPicsPanel}/>
            <Route exact path="/admin/home/captions" component={CaptionsPanel}/>
            <Route exact path="/admin/home/main-texts" component={MainTextsPanel}/>
            <Route exact path="/admin/projects" component={ProjectsPanel} />
          </div>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default AdminPanel;
