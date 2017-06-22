import React from 'react';
import ActivityHolder from '../components/Activities/ActivityHolder';

const activities = [{
  imageLinks: [
    "/static/project1.jpg",
    "/static/project2.jpg"
  ],

  heading: "Activity #1",

  details: "We did this we did that"
}, {
  imageLinks: [
    "/static/project1.jpg",
    "/static/project2.jpg"
  ],

  heading: "Activity #2",

  details: "We did number #2"
}];

const Activities = () => (
  <div className="activities">
    <h2>Activities Done</h2>{activities.map((activity, index) => (
    <ActivityHolder key={index} {...activity}/>))}
  </div>
);

export default Activities;
