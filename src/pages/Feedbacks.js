import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getStorage } from '../services';

class Feedbacks extends Component {
  render() {
    const minAssertions = 3;
    const { history } = this.props;
    const { player: { assertions } } = getStorage('state');

    if (assertions >= minAssertions) {
      return (
        <div>
          <h1 data-testid="feedback-text">
            Mandou bem!
          </h1>
          <h4 data-testid="feedback-total-score">
            { assertions }
          </h4>
          <h4 data-testid="feedback-total-question">
            { assertions }
          </h4>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Jogar Novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ver Ranking
          </button>

        </div>

      );
    }
    return (
      <div>
        <h1 data-testid="feedback-text">
          Podia ser melhor...
        </h1>
        <h4 data-testid="feedback-total-score">
          { assertions }
        </h4>
        <h4 data-testid="feedback-total-question">
          { assertions }
        </h4>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>
      </div>

    );
  }
}

Feedbacks.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Feedbacks;
