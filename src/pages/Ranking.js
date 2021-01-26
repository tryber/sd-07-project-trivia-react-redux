import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Ranking.css';
import PropTypes from 'prop-types';
import { getScore } from '../actions';

class Ranking extends Component {
  constructor() {
    super();
    this.goToLogin = this.goToLogin.bind(this);
  }

  goToLogin() {
    const { history, sendScore } = this.props;
    sendScore(0);
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">RANKING SCREEN</h1>
        <ol>
          {ranking.map((player, index) => (
            <li key={ player }>
              <div className="flex-box-ranking">
                <img className="ranking-user-img" src={ player.picture } alt="img" />
                <span data-testid={ `player-name-${index}` }>
                  {player.name}
                </span>
                <span data-testid={ `player-score-${index}` }>
                  {` - ${player.score} pontos`}
                </span>
              </div>
            </li>))}
        </ol>

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goToLogin }
        >
          JOGAR NOVAMENTE
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendScore: (score) => dispatch(getScore(score)),
});

export default connect(null, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendScore: PropTypes.func.isRequired,
};
