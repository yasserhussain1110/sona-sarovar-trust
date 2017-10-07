import React from 'react';
import {NavLink} from 'react-router-dom';

const MediaEventsBlog = () => (
  <div className="media-events-blog">
    <h2>Media, Events and Blogs</h2>
    <div className="link-holder">
      <div className="donate">
        <h3>Donate to help</h3>
        <div className="iframe-holder">
          <iframe title="Our Movie" src="https://www.youtube.com/embed/VT3SRGNr22I" />
        </div>
        <NavLink to="" className="button">Donate Now</NavLink>
      </div>
      <div className="events">
        <h3>Our Events</h3>
        <div className="img-holder">
          <img alt="" src="/home/IMG2.jpg" />
        </div>
        <NavLink to="" className="button">See More</NavLink>
      </div>
      <div className="blog">
        <h3>Our Blogs</h3>
        <div className="img-holder">
          <img alt="" src="/home/IMG2.jpg" />
        </div>
        <NavLink to="" className="button">Read Blog</NavLink>
      </div>
    </div>
  </div>
);

export default MediaEventsBlog;
