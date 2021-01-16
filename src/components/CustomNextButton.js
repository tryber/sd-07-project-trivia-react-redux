import React from 'react';

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
  next: PropTypes.number.isRequired,
};
