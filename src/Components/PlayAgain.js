import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class PlayAgain extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

PlayAgain.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

export default PlayAgain;
