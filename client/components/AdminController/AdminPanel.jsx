import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import BaseContainer from './BaseContainer';
import BasicSideNav from './BasicSideNav';
import Component1 from './Component1';
import Component2 from './Component2';

const AdminPanel = ({match}) => {
  return (
    <BrowserRouter>
      <main id="admin-panel">
        <div style={{display: 'flex'}}>
          <BaseContainer style={{background: '#2c3e50', color: '#FFF'}}>
            <BasicSideNav adminMatch={match}/>
          </BaseContainer>
        </div>
        <Route path="/admin/sales" component={Component1}/>
        <Route path="/admin/products" component={Component2}/>
      </main>
    </BrowserRouter>
  );
};

export default AdminPanel;
