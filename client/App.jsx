import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Header from './components/Header'
import 'typeface-kelly-slab';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Header/>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
