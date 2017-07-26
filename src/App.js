import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game'
import Boostrap from '../node_modules/bootstrap/dist/css/bootstrap.css'
import FontAwesome from '../node_modules/font-awesome/css/font-awesome.css'

class App extends Component {
  render() {
    return (
      <Game />
    );
  }
}

export default App;
