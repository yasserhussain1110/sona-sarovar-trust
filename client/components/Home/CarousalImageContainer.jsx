import React from 'react';

const CarousalImageContainer = ({imageLinks, isImageActive}) => (
  <div className="carousal-image-container">{imageLinks.map((link, index) => (
    <img key={index} className={isImageActive(index) ? "active" : "inactive"} src={link}/>))}
  </div>
);

export default CarousalImageContainer;
