import React from 'react';

// This tells Javascript that we want the ReactDOM library out of the ‘react-dom’ NPM module.
import ReactDOM from 'react-dom';

// This tells Javascript that we want to import the App component from a local file called “App.js”.
// The “.js” can be left off completely; ES2015 is smart enough to assume that’s where it is coming from.
// Also, any “from” statements where the module name starts with a “./” means that
// you’re importing from a local file/directory, not from a module that’s installed via NPM.
// App.js is a local file inside of src/, so that’s why we’re using “./App” here.
import App from './App';

// index.css acts as our main global CSS file.
import './index.css';

// allows us access to implementing service workers for progressive web apps in our create react app!
import registerServiceWorker from './registerServiceWorker';



/*
  Main Render call from ReactDOM.
  ReactDOM has one function in particular that we want to use: render().
  Render tells React precisely HOW to throw a component into your browser.
  It imports our App.js component that we start off with and tells React where to render it
  (remember that div with an id of root?). index.css stores the base styling for our application.
  Render is a function that takes three arguments:

  - Which component to render
  - Where to render that component
  - Optional callback
 */
ReactDOM.render(
    <App />,
    //The <div id=”root”> bit is the important part: this is where your react application gets rendered in your browser!
    document.getElementById('root'), () => {
      //As this is a demo app I want to observe the app rendering time so I can understand if there are more performing solutions
      console.timeEnd('react-app');
    });

// A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction.
// for more info visit https://developers.google.com/web/fundamentals/primers/service-workers/
registerServiceWorker();
