import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Play extends Component {
  hash() {
    const { email } = this.props;
    const url = `https://www.gravatar.com/avatar/${md5(email)}`;
    return url;
  }

  render() {
    const { name, score = 0 } = this.props;
    return (
      <div>
        <header>
          <img src={ this.hash() } alt="avatar" data-testid="header-profile-picture" />
          <h1 data-testid="header-player-name">{name}</h1>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  email: state.login.email,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Play);
