import React from 'react';

class FeedbackHeader extends React.Component {
  render() {
    return (
      <div className="feedback-header">
        <img 
          className="user-image" 
          src="" 
          alt="user profile"
          data-testid="header-profile-picture"
        />
        <span  
          className="user-name"
          data-testid="header-player-name"
        >
          User name
        </span>
        <span
          className="score"
          data-testid="score"
        >
          score
        </span>
      </div>
    );
  }
}

export default FeedbackHeader;