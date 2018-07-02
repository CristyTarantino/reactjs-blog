import React from 'react';

import './comment-avatar-list.css';

export default class CommentAvatarList extends React.Component {
  render() {

    const { avatars = [] } = this.props;

    return (
        <div className="comment-avatars">
          <h4>Authors</h4>
          <ul>
            {avatars.map((avatarUrl, i) => (
                <li key={i}>
                  <img src={avatarUrl} alt={avatarUrl}/>
                </li>
            ))}
          </ul>
        </div>
    )
  }
}