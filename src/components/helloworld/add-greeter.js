import React from 'react';

import './add-greeter.css';

export default class AddGreeter extends React.Component {
  constructor(props){
    super(props);
    this._addGreeting = this._addGreeting.bind(this);
  }

  render(){
    return (
      <div className="add-greeter">
        <input placeholder="Name" type="text" ref={input => this._greetingName = input}/>
        <button onClick={this._addGreeting}>Add</button>
      </div>
    );
  }

  _addGreeting(event) {
    event.preventDefault();
    this.props.addGreeting(this._greetingName.value);
    this._greetingName.value = '';
  }
}