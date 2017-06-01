import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <h1>hello world!</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
