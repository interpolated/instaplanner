import React, { Component } from 'react';
import './App.css';
import MapSection from './components/map_section'
import {Header}  from './components/header';


class App extends Component {
  render() {
    console.log(MapSection)
    return (
      <div className="App">
          <MapSection/>
      </div>
    );
  }
}

export default App;
