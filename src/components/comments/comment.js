import React from 'react';

import './comment.css';

import CommentConfirmation from './comment-confiramtion';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    // state allows to do Indirect DOM Manipulation
    this.state = {
      isAbusive: false
    };

    // every time setState is called the render function gets called again
    // every time we do .bind inline we are making a new reference every time render is called
    // by doing this we are relying on the garbage collector to get rid of those objects over time
    // whereas if we pre-bind them we are only using one memory reference
    this._handleConfirm = this._handleConfirm.bind(this);
    this._toggleAbuse = this._toggleAbuse.bind(this);
  }

  render() {

    let commentBody;

    if (!this.state.isAbusive) {
      commentBody = this.props.body;
    } else {
      commentBody = <em>Content marked as abusive</em>;
    }

    return(
        <div className="comment">

          <img src={this.props.avatarUrl} alt={`${this.props.author}`} />

          <p className="comment-header">{this.props.author}</p>
          <p className="comment-body">{commentBody}</p>

          <div className="comment-actions">
            <CommentConfirmation onDelete={this._handleConfirm}>
              Delete Comment?
            </CommentConfirmation>
            <CommentConfirmation onDelete={this._toggleAbuse}>
              Report as abuse
            </CommentConfirmation>
          </div>
        </div>
    );
  }

  // The abuse state is false by default in the constructor
  // When the child component CommentConfirmation triggers the onDelete handler,
  // _toggleAbuse gets called and changes the state of isAbusive which then triggers the
  // render() method. If the state is abusive the commentBody will be <em>Content marked as abusive</em>
  _toggleAbuse() {
    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }

  // When the child component CommentConfirmation triggers the onDelete handler,
  // _handleConfirm gets called and calls the parent onDelete method passed to it through props
  // passing its id as argument
  _handleConfirm() {
    // This calls the “onDelete” function that was passed in via Comment-box props
    // and passes the id of the comment that needs to be deleted
    this.props.onDelete(this.props.id);
  }
}