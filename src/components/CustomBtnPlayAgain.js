import React from 'react';

export default function PlayAgain({ history: push }) {
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
  history: PropTypes.shape({
    push: PropTypes.function.isRequired,
  }).isRequired,
};
