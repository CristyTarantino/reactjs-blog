import React, {Component} from 'react';
import Header from './layout/header';
import Main from './layout/main';

// Embedding Stylesheets In Your Main Component App
import './App.css';
/*
  App.js is a sample React component called “App” that we get for free when creating a new app.
  App.css stores styling targeting that component specifically.
 */
class App extends Component {
  render() {
    return (
        <div className="App">
          <Header/>
          <Main/>
        </div>
    )
  }
}

export default App


/*
  Any functional components that we write need to return the JSX that tells React how to create the component.
  Note that we wrap the JSX inside of parentheses!
  This is a good practice to just always do, even though you only technically need it for multi-line JSX statements.

  JSX is a templating language that looks VERY similar to HTML.
  This allows you to write templates for your components in a way
  that’s very comfortable to developers already familiar with HTML,
  but there are a few extra things that it provides.
  First, you can embed any javascript inside of a JSX template by wrapping it in curly braces (these: {}).
  Second, some words are special and reserved, such as class, so there are JSX-specific
  properties/attributes/etc you need to use (such as className).

  In addition, React components must only return a SINGLE JSX node at its root, so it’s very common
  to wrap up your components into a single div that might have multiple children underneath it.
 */