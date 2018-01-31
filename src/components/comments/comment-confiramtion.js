import React from 'react';

export default class CommentConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirm: false
    };

    // every time setState is called the render function gets called again
    // every time we do .bind inline we are making a new reference every time render is called
    // by doing this we are relying on the garbage collector to get rid of those objects over time
    // whereas if we pre-bind them we are only using one memory reference
    this._confirmDelete = this._confirmDelete.bind(this);
    this._toggleConfirmMessage = this._toggleConfirmMessage.bind(this);
  }

  render() {

    let confirmNode;

    if (this.state.showConfirm) {
      return (
          <span>
          <a href="" onClick={this._confirmDelete}>Yes </a> - or - <a href="" onClick={this._toggleConfirmMessage}> No</a>
        </span>
      );
    } else {
      confirmNode = <a href="" onClick={this._toggleConfirmMessage}>{this.props.children}</a>;
    }

    return (
        <span>
        {confirmNode}
      </span>
    );
  }

  _toggleConfirmMessage(event) {
    event.preventDefault();

    this.setState({
      showConfirm: !this.state.showConfirm
    });

  }

  _confirmDelete(event) {
    event.preventDefault();
    // call the comment component onDelete prop
    this.props.onDelete();
  }
}