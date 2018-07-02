import React from 'react';
import CommentBox from '../components/comments/comment-box';

export default class VideoPage extends React.Component {
  render() {
    return (
        <div>
          <div className="cell">
            <article className="article article--video">

              <div className="article--picture-author">
                Video by <strong>@morganmccircuit</strong>
              </div>

              <div className="article--video-img">
                <img src="assets/images/video.jpg" alt="" />
              </div>

            </article>
          </div>

          {/* Load the component CommentBox with the required prop apiUrl */}
          <CommentBox apiUrl="api/videos/comments.json" />
        </div>
    )
  }
}