import React from 'react'

const BaseContainer = props => (
  <div
    style={{
      display: 'inline-block',
      paddingTop: 16,
      paddingBottom: 16,
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: '500',
      width: 240,
      height: '100%',
      ...props.style
    }}
  >
    {props.children}
  </div>
);

export default BaseContainer;
