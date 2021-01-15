import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { readRanking } from '../../services/storageService';

import './index.css';

class Ranking extends Component {
  constructor() {
    super();
    this.renderRanking = this.renderRanking.bind(this);
  }

  renderRanking(ranking) {
    return ranking.map((player, index) => (
      <tr key={ index + 1 }>
        <td><img alt={ player.name } src={ player.picture } /></td>
        <td><p data-testid={ `player-name-${index}` }>{player.name}</p></td>
        <td><p data-testid={ `player-score-${index}` }>{player.score}</p></td>
      </tr>
    ));
  }

  render() {
    const { history } = this.props;
    const ranking = readRanking();
    return (
      <div className="ranking__container">
        <div className="ranking__content">
          <h1 className="ranking__title" data-testid="ranking-title">Ranking</h1>
          <table className="ranking__table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRanking(ranking)}
            </tbody>
          </table>
          <button
            className="ranking__button"
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('/') }
          >
            Voltar
          </button>
        </div>
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
