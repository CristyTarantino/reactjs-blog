import React from 'react';
import HelloWorldList from '../components/helloworld/hello-world-list';

export default class HelloWorld extends React.Component {
  render() {
    return (<div className="HelloWorld">
      <HelloWorldList />
    </div>);
  }
}