import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { readRanking } from '../../services/storageService';

class Ranking extends Component {
  constructor() {
    super();
    this.renderRanking = this.renderRanking.bind(this);
  }

  renderRanking(ranking) {
    return ranking.map((player, index) => (
      <div key={ index + 1 }>
        <img alt={ player.name } src={ player.picture } />
        <p data-testid={ `player-name-${index}` }>{player.name}</p>
        <p data-testid={ `player-score-${index}` }>{player.score}</p>
      </div>
    ));
  }

  render() {
    const { history } = this.props;
    const ranking = readRanking();
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>{this.renderRanking(ranking)}</div>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/') }
        >
          Voltar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
