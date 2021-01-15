import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { ranking, history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">RANKING PAGE</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
        <ul>
          { ranking
          && ranking
            .sort((a, b) => (b.score - a.score))
            .map((player) => (
              <li key={ player.index }>
                <img
                  src={ player.picture }
                  alt="Profile"
                  data-testid="player-picture"
                />
                <h3 data-testid={ `player-name-${player.index}` }>
                  {player.name}
                </h3>
                <h3 data-testid={ `player-score-${player.index}` }>
                  {player.score}
                </h3>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

Ranking.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ranking: state.ranking.ranking,
});

export default connect(mapStateToProps)(Ranking);
