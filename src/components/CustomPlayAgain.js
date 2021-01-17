import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reloadGame } from '../actions';

function CustomPlayAgain({ push, dispatchReload }) {
  return (
    <button
      type="button"
      data-testid="btn-play-again"
      onClick={ () => {
        dispatchReload();
        push('/');
      } }
    >
      Jogar novamente
    </button>
  );
}

CustomPlayAgain.propTypes = {
  push: PropTypes.func.isRequired,
  dispatchReload: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchReload: () => dispatch(reloadGame()),
});

export default connect(null, mapDispatchToProps)(CustomPlayAgain);
