import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class PlayAgain extends Component {
  constructor() {
    super();
    this.click = this.click.bind(this);
  }

  click() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.click }
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
