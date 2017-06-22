import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './containers/Home';
import About from './containers/About';
import Header from './containers/Header';
import Projects from './containers/Projects';
import Activities from './containers/Activities';
import 'typeface-kelly-slab';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Header/>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/activities" component={Activities}/>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
