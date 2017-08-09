import React from 'react';
import CenterPicsPanel from './HomePanel/CenterPicsPanel';

const HomePanel = () => {
  return (
    <div className="controller home-panel">
      <h1>Home Panel</h1>
      <section className="sub-panel">
        <CenterPicsPanel />
      </section>
    </div>
  );
};

export default HomePanel;
