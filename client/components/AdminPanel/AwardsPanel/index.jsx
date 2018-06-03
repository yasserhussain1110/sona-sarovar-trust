import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AddAwardsPanel from './AddAwardsPanel';
import ListAwardsPanel from './ListAwardsPanel';

const AwardsPanel = () => (
  <div className="controller awards-panel">
    <h1>Testimonials Panel</h1>
    <Switch>
      <Route path="/admin/awards/add" component={AddAwardsPanel} />
      <Route path="/admin/awards" component={ListAwardsPanel} />
    </Switch>
  </div>
);

export default AwardsPanel;
