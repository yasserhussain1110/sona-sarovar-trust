import React from 'react';
import ImageCarousal from '../../lib/ImageCarousal';
import MessageCarousal from '../../lib/MessageCarousal';

const imageLinks = [
  "/static/IMG1.jpg",
  "/static/IMG2.jpg",
];

const messages = [
  "66% of street children in Mumbai never receive any education.",
  "You can make a difference in their lives.",
  "Come, join our hands in helping improve their lives."
];

const Carousal = () => (
  <div className="carousal">
    <ImageCarousal imageLinks={imageLinks} viewDuration={6000} />
    <MessageCarousal messages={messages} viewDuration={3000} />
  </div>
);

export default Carousal;
