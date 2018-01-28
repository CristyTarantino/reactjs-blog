import React from 'react';

import CommentConfirmation from './comment-confiramtion';

export default class Comment extends React.Component {
  constructor() {
    super();

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

  _toggleAbuse() {
    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }

  _handleConfirm() {
    this.props.onDelete(this.props.id);
  }
}