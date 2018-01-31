import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
        <header>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to="/picture">Picture</Link></li>
              <li><Link to="/video">Video</Link></li>
            </ul>
          </nav>
        </header>
    )
  }
}