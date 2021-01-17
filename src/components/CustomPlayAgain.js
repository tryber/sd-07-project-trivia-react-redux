import React from 'react';
import PropTypes from 'prop-types';

export default function CustomPlayAgain({ push }) {
  return (
    <button
      type="button"
      data-testid="btn-play-again"
      onClick={ () => { push('/'); } }
    >
      Jogar novamente
    </button>
  );
}
CustomPlayAgain.propTypes = { push: PropTypes.func.isRequired };
