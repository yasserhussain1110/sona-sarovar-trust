import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AddTestimonialsPanel from './AddTestimonialsPanel';
import ListTestimonialsPanel from './ListTestimonialsPanel';

const TestimonialsPanel = () => (
  <div className="controller projects-panel testimonials-panel">
    <h1>Testimonials Panel</h1>
    <Switch>
      <Route path="/admin/testimonials/add" component={AddTestimonialsPanel} />
      <Route path="/admin/testimonials" component={ListTestimonialsPanel} />
    </Switch>
  </div>
);

export default TestimonialsPanel;
