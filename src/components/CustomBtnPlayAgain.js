import React from 'react';
import PropTypes from 'prop-types';

export default function PlayAgain({ push }) {
  return (
    <button
      type="button"
      data-testid="btn-play-again"
      onClick={ () => { push('/gamescreen'); } }
    >
      Jogar novamente
    </button>
  );
}
PlayAgain.propTypes = {
  push: PropTypes.func.isRequired,
};
