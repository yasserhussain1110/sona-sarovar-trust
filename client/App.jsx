import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Web from './routes/Web';
import Admin from './routes/Admin';
import 'typeface-kelly-slab';

class App extends Component {
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
