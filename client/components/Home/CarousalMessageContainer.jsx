import React from 'react';

const CarousalMessageContainer = ({isMessageActive, messages}) => (
  <div className="carousal-message-container">{messages.map((message, index) => (
    <div
      key={index}
      className={`${isMessageActive(index) ? "active" : "inactive"} message`}>
      {message}
    </div>))}
  </div>
);

export default CarousalMessageContainer;
