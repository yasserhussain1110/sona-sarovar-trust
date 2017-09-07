import React from 'react';
import BrandLogoPanel from './HomePanel/BrandLogoPanel';
import CenterPicsPanel from './HomePanel/CenterPicsPanel';
import CaptionsPanel from './HomePanel/CaptionsPanel';
import MainTextPanel from './HomePanel/MainTextPanel';

const HomePanel = () => {
  return (
    <div className="controller home-panel">
      <h1>Home Panel</h1>
      <section className="sub-panel">
        <BrandLogoPanel />
        <CenterPicsPanel />
        <CaptionsPanel />
        <MainTextPanel />
      </section>
    </div>
  );
};

export default HomePanel;
