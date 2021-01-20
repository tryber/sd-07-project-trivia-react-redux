import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateScoreAction } from '../actions/index';

class Ranking extends Component {
  constructor() {
    super();
    this.resetStorage = this.resetStorage.bind(this);
  }

  resetStorage() {
    const { updateScore } = this.props;
    const { history } = this.props;
    const playerStorage = localStorage.getItem('state');
    const playerStorageJson = JSON.parse(playerStorage);
    const { name, gravatarEmail } = playerStorageJson.player;
    const newPlayer = {
      player: {
        name,
        gravatarEmail,
        assertions: 0,
        score: 0,
      },
    };
    localStorage.setItem('state', JSON.stringify(newPlayer));
    updateScore();
    history.push('/');
  }

  render() {
    const rankingJson = localStorage.getItem('ranking');
    const ranking = JSON.parse(rankingJson);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {ranking
            .sort((first, second) => second.player.score - first.player.score)
            .map(({ player }, index) => (
              <li key={ index }>
                <img
                  src={ player.gravatarEmail }
                  alt="player"
                />
                <p
                  data-testid={ `player-name-${index}` }
                >
                  {player.name}
                </p>
                <p
                  data-testid={ `player-score-${player.score}` }
                >
                  { player.score }
                  {' '}
                  pontos
                </p>
              </li>
            ))}
        </ul>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.resetStorage }
        >
          Início
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  score: state.userReducer.score,
  hash: state.hashReducer.hash,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: () => dispatch(
    updateScoreAction(0, 0),
  ),
});

Ranking.propTypes = {
  updateScore: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
