import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Web from './Web';
import Admin from './Admin';
import 'typeface-kelly-slab';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Route path="/web" component={Web}/>
          <Route path="/admin" component={Admin}/>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
