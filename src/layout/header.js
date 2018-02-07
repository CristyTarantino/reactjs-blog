import React from 'react';
import {Link} from 'react-router-dom';

import './header.css';

export default class Header extends React.Component {
  render() {
    return (
        <header>
          <nav className="top-menu">
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to="/picture">Picture</Link></li>
              <li><Link to="/video">Video</Link></li>
              <li><Link to="/helloworld">Hello World</Link></li>
            </ul>
          </nav>
        </header>
    )
  }
}