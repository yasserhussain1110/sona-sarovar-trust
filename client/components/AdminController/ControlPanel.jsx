import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Component1 from './Component1';
import Component2 from './Component2';

const Admin = ({match}) => (
  <BrowserRouter>
    <main id="admin">
      <Route path={`${match.url}/one`} component={Component1}/>
      <Route path={`${match.url}/two`} component={Component2}/>
    </main>
  </BrowserRouter>
);

export default Admin;
