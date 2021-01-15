import React from 'react';
import PropTypes from 'prop-types';

const NextButton = ({ nextQuestion }) => (
  <button type="button" data-testid="btn-next" onClick={ nextQuestion }>
    Próxima
  </button>
);

NextButton.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
};
export default NextButton;
