import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import '../css/Header.css';

class GameHeader extends Component {
  constructor() {
    super();
    this.fetchGravatar = this.fetchGravatar.bind(this);
    this.readLocalState = this.readLocalState.bind(this);
    this.readLocalRanking = this.readLocalRanking.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  componentDidMount() {
    this.fetchGravatar();
  }

  componentDidUpdate() {
    this.updateLocalStorage();
  }

  fetchGravatar() {
    const { getEmail } = this.props;
    const hashEmail = md5(getEmail);
    const endPoint = `https://www.gravatar.com/avatar/${hashEmail}`;
    return endPoint;
  }

  readLocalState() {
    const readState = JSON.parse(localStorage.getItem('state'));
    return readState;
  }

  readLocalRanking() {
    const readRanking = JSON.parse(localStorage.getItem('ranking'));
    return readRanking;
  }

  updateLocalStorage() {
    const { getScore } = this.props;
    const currentState = this.readLocalState();
    const currentRanking = this.readLocalRanking();
    const newStateStorage = { ...currentState,
      player: { ...currentState.player, score: getScore } };
    localStorage.setItem('state', JSON.stringify(newStateStorage));

    const newRankingStorage = { ...currentRanking,
      score: getScore };
    localStorage.setItem('ranking', JSON.stringify(newRankingStorage));
  }

  render() {
    const { getName, getScore } = this.props;
    return (
      <header className="game-header-container">
        <img
          data-testid="header-profile-picture"
          src={ this.fetchGravatar() }
          alt={ getName }
        />
        <p data-testid="header-player-name">{ getName }</p>
        <p data-testid="header-score">{ getScore }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ userReducer, scoreReducer }) => ({
  getEmail: userReducer.email,
  getName: userReducer.name,
  getScore: scoreReducer.score,
});

GameHeader.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(GameHeader);
