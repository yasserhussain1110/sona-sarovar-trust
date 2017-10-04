import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';  // eslint-disable-line import/no-extraneous-dependencies
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';
import App from './App';
import './stylesheets/main.scss';
import {initializeHandler} from './lib/handlers/commonErrorsHandler';

const configureStore = initialState => {
  const store = createStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;  // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

const store = configureStore();

initializeHandler(store.dispatch);

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.querySelector('#app'),
);

if (module.hot) {
  module.hot.accept(App, () => render(App));
}
