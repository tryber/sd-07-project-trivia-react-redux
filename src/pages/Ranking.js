import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const { name, score, hash } = this.props;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <p data-testid={ `player-name-${0}` }>{name}</p>
        <p data-testid={ `player-score-${1}` }>{score}</p>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt={ name } />
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Início</button>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  score: state.userReducer.score,
  hash: state.hashReducer.hash,
});

Ranking.propTypes = {
  score: PropTypes.number.isRequired,
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
