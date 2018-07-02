import React from 'react';
import Hello from './hello';
import AddGreeter from './add-greeter';

import './hello-world-list.css';

export default class HelloWorldList extends React.Component {
  constructor(props){
    super(props);
    this.state = { greetings: ['Tizio', 'Caio', 'Sempronio'] };
    this.addGreeting = this.addGreeting.bind(this);
    this.removeGreeting = this.removeGreeting.bind(this);
  }

  render(){
    return (
      <div className="hello_world_list">
        <AddGreeter addGreeting={this.addGreeting} />
        {this._renderGreetings()}
      </div>
    );
  }

  _renderGreetings() {
    return this.state.greetings.map((name, index) => (
        <Hello key={index} name={name} removeGreeting={this.removeGreeting} />
    ));
  }

  addGreeting(newName) {
    this.setState({ greetings: [...this.state.greetings, newName] });
  }

  removeGreeting(removeName) {
    const filteredGreetings = this.state.greetings.filter(name => {
      return name !== removeName;
    });
    this.setState({ greetings: filteredGreetings });
  }
}