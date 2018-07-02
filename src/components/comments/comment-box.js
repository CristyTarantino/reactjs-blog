import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import './comment-box';

import CommentForm from './comment-form';
import CommentAvatarList from './comment-avatar-list';
import Comment from './comment';

export default class CommentBox extends React.Component {

  /*
    Before we can start dealing with our internal state in our component, we need to set up an initial state.
    To do that, we’ll need to implement a constructor for our class
    (a function that is called when the class is used anywhere).
    constructor() is a special function that ES2015 functions rely on to perform some actions when the class is used
    (usually referred to as “instantiation”).
    As I mentioned previously, it needs to accept a “props” argument.
    It also needs to call out to its parent constructor, which it does via the call to super(props).
    This calls the parent’s constructor (which since it is a Component too is also expecting props passed to it).
    Then, we set a property on the class called “state” via the this.state declaration.
   */
  constructor(props) {
    super(props);

    this.state = {
      showComments: true,
      comments: []
    };

    // every time setState is called the render function gets called again
    // every time we do .bind inline we are making a new reference every time render is called
    // by doing this we are relying on the garbage collector to get rid of those objects over time
    // whereas if we pre-bind them we are only using one memory reference

    // Why do we use bind? Because any events that need to access any internal object details
    // need to be explicitly bound to that instance of that component
    // In simpler terms, that means that “this._addComment” doesn’t really know how to call “this.setState”,
    // because it doesn't understand what this is supposed to refer to
    // bind(this) tells Javascript “Hey, any time you see a reference to this inside of the _addComment function,
    // I want you specifically to refer to ME CommentBox”
    this._addComment = this._addComment.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  /*
    componentWillMount() is invoked immediately before mounting occurs.
    It is called before render(), therefore calling setState() synchronously
    in this method will not trigger an extra rendering.
    This is the only lifecycle hook called on server rendering.
   */
  componentWillMount() {
    this._fetchComments();
  }

  render() {
    const comments = this._getComments();

    let commentNode;
    let buttonText = 'Show comments';

    if (this.state.showComments) {
      buttonText = 'Hide comments';
      commentNode = (<div className="comment-list">{comments}</div>);
    }

    return (
        <div className="row comments-container">
          <div className="cell">
            <h2>Join The Discussion</h2>
            <div className="comment-box">
              <CommentForm addComment={this._addComment}/>
              <CommentAvatarList avatars={this._getAvatars()}/>

              {this._getPopularMessage(comments.length)}
              <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
              {this._getCommentsVisibility(comments.length, buttonText)}
              {commentNode}
            </div>
          </div>
        </div>

    );
  }

  _getAvatars() {
    return this.state.comments.map(comment => comment.avatarUrl);
  }

  /*
    return the comment component
    Iterate over our list of comments stored in state (so this.state.comments) and for each one of those,
    render the Comment component (child component) and pass in the props.

    We pass a key prop because for React to know which element to modify/remove/etc
    when one of the elements in your list changes,
    it has to be able to uniquely identify which element it is,
    so here we’re just specifying the key as the name.

    We also specify an onDelete event handler in our innerComponent that calls a _deleteComment
    function defined on our class CommentBox
   */
  _getComments() {
    // The operation that we’re performing here is a map operation,
    // which says “loop over the array and call a function for each element in that array,
    // storing the results in a new array”.
    return this.state.comments.map((comment) => {
      // we are passing arguments that in React are called props to the child component
      return <Comment
          {...comment}
          onDelete={this._deleteComment}
          key={comment.id}/>
    });
  }

  _addComment(commentAuthor, commentBody) {
    const comment = {
      id: this.state.comments.length + 1,
      author: commentAuthor,
      body: commentBody,
      avatarUrl: 'assets/images/avatars/avatar-default.png'
    };

    // array concatenation shortcut. This says “the start of the array should remain this.state.greetings,
    // but I also want you to add newName onto the end of the array.
    // This should return a new modified copy of the array but not change the original.”
    // This is because React state works with Immutability principle
    this.setState({comments: [...this.state.comments, comment]});
  }

  _fetchComments() {
    axios.get(this.props.apiUrl)
        .then(response => {
          const comments = response.data;
          this.setState({comments});
        });
  }

  _handleClick(event) {
    event.preventDefault();
    this.setState({showComments: !this.state.showComments});
  }

  _deleteComment(commentID) {
    // find the comment with the given id and creates a new comment array without it
    // This is because React state works with Immutability principle
    const comments = this.state.comments.filter(
        comment => comment.id !== commentID
    );

    // You cannot modify the state object inside of a class directly.
    // Instead, any state changes NEED to happen via the this.setState function.
    // setState only changes keys that are specified inside of the state;
    // it does not replace the entire state.
    // N.B. Every time you call setState it will call the render() method
    this.setState({comments});
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
      return (
          <div>This post is getting really popular, dont miss out!</div>
      );
    }
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  _getCommentsVisibility(commentCount, buttonText){
    if (commentCount) {
      return (
          <div className="comment-visibility-actions">
            <button onClick={this._handleClick}>{buttonText}</button>
          </div>
      );
    }
  }
}

CommentBox.propTypes = {
  apiUrl: PropTypes.string.isRequired
};