import React, { Component } from 'react';

class FeedbackHeader extends Component {
  constructor() {
    super();
    this.state = {
      score: '0',
    };
  }

  render() {
    const { email, name } = this.props;
    const { score } = this.state;
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${md5(email)}` } data-testid="header-profile-picture" alt="perfilImg" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ UserInfo: { name, email } }) => ({
  name, email,
});

export default connect(mapStateToProps)(FeedbackHeader);

FeedbackHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
