import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import reducer from './reducers';
import App from './App';
import './stylesheets/main.scss';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.querySelector('#app'),
);

if (module.hot) module.hot.accept(App, () => render(App));
