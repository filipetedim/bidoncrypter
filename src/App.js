import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Home from './containers/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Bidoncrypter</h1>
        </header>
        <div className="App-intro">
          <Home />
        </div>
      </div>
    );
  }
}

export default App;
