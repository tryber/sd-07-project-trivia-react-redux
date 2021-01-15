import React from 'react';
import PropTypes from 'prop-types';

export default function CustomNextButton({ next }) {
  return (
    <div>
      <button onClick={ next } type="button" data-testid="btn-next">
        Próxima
      </button>
    </div>
  );
}
CustomNextButton.propTypes = {
  next: PropTypes.func.isRequired,
};
