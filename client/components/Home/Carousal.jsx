import React from 'react';
import ImageCarousal from '../../lib/ImageCarousal';
import MessageCarousal from '../../lib/MessageCarousal';

const Carousal = ({messages, imageLinks}) => (
  <div className="carousal">
    <ImageCarousal imageLinks={imageLinks} viewDuration={6000} />
    <MessageCarousal messages={messages} viewDuration={3000} />
  </div>
);

export default Carousal;
