import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Voltar para tela inicial
        </button>
      </div>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Ranking;
