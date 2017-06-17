import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './containers/Home';
import About from './containers/About';
import Header from './containers/Header'
import 'typeface-kelly-slab';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Header/>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
