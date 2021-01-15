import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';

class Ranking extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { resetScoreAction, resetQuestionAction, history } = this.props;
    resetScoreAction();
    resetQuestionAction();
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const ordenedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {ordenedRanking.map((player, index) => (
            <li key={ player.name }>
              <img src={ player.picture } alt={ player.name } />
              <p data-testid={ `player-name-${index}` }>
                {player.name}
              </p>
              <p data-testid={ `player-score-${index}` }>
                Pontuação:
                {player.score}
              </p>
            </li>
          ))}
        </ol>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Início
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetQuestionAction: () => dispatch(actions.resetQuestion()),
  resetScoreAction: () => dispatch(actions.resetScore()),
});

export default connect(null, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  resetScoreAction: PropTypes.func.isRequired,
  resetQuestionAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
