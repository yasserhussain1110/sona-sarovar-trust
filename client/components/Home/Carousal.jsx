import React from 'react';
import ImageCarousal from '../../lib/components/ImageCarousal';
import MessageCarousal from '../../lib/components/MessageCarousal';

const Carousal = ({messages, imageLinks}) => (
  <div className="carousal">
    <ImageCarousal imageLinks={imageLinks} viewDuration={6000} />
    <MessageCarousal messages={messages} viewDuration={3000} />
  </div>
);

export default Carousal;
