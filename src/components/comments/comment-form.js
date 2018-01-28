import React from 'react';

export default class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: 0
    };

    // every time setState is called the render function gets called again
    // every time we do .bind inline we are making a new reference every time render is called
    // by doing this we are relying on the garbage collector to get rid of those objects over time
    // whereas if we pre-bind them we are only using one memory reference
    this._handleSubmit = this._handleSubmit.bind(this);
    this._getCharacterCount = this._getCharacterCount.bind(this);
  }

  render() {
    return (
        <form className="comment-form" onSubmit={this._handleSubmit}>
          <label>New comment</label>
          <div className="comment-form-fields">
            <input placeholder="Name:" ref={c => this._author = c} />
            <textarea placeholder="Comment:" ref={c => this._body = c} onChange={this._getCharacterCount}></textarea>
          </div>
          <p>{this.state.characters} characters</p>
          <div className="comment-form-actions">
            <button type="submit">
              Post comment
            </button>
          </div>
        </form>
    );
  }

  _getCharacterCount() {

    this.setState({
      characters: this._body.value.length
    });

  }

  _handleSubmit(event) {
    event.preventDefault();

    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({ characters: 0  });
  }
}