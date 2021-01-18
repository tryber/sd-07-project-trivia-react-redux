import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Header.css';
import { readLocalState, fetchGravatar, readLocalRanking } from '../utils/utils';

class GameHeader extends Component {
  constructor() {
    super();
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  componentDidMount() {
    fetchGravatar();
  }

  componentDidUpdate() {
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    const { getScore, getAssertions } = this.props;
    const currentState = readLocalState();
    const rankingState = readLocalRanking();
    const one = 1;

    if (rankingState && rankingState.length > 0) {
      localStorage.setItem('ranking', JSON.stringify(rankingState
        .sort((a, b) => (a.score > b.score ? -one : 1))));
    }

    const newStateStorage = {
      player: { ...currentState.player, score: getScore, assertions: getAssertions },
    };

    localStorage.setItem('state', JSON.stringify(newStateStorage));
  }

  render() {
    const { getName, getScore, getEmail } = this.props;
    return (
      <header className="game-header-container">
        <img
          data-testid="header-profile-picture"
          src={ fetchGravatar(getEmail) }
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
  getAssertions: scoreReducer.correctAnswers,
});

GameHeader.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  getAssertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(GameHeader);
