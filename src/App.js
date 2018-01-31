import React, {Component} from 'react';

import Header from './layout/header';
import Main from './layout/main';

import './App.css';

class App extends Component {
  render() {
    return <div>
      <Header />
      <Main />
    </div>
  }
}

export default App