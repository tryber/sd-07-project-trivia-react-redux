import React from 'react';
import PropTypes from 'prop-types';


export default function CustomPlayAgain({ goHome }) {
  return (
    <button
      type="button"
      data-testid="btn-play-again"
      onClick={ goHome }
    >
      Jogar novamente
    </button>
  );
}
CustomPlayAgain.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
