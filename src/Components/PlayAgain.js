import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import actions from '../Actions';

class PlayAgain extends Component {
  constructor() {
    super();
    this.click = this.click.bind(this);
  }

  click() {
    const { history, resetScoreDispatch } = this.props;
    resetScoreDispatch();
    const playerObject = JSON.parse(localStorage.getItem('state'));
    playerObject.player.assertions = 0;
    playerObject.player.score = 0;
    playerObject.player.name = '';
    playerObject.player.gravatarEmail = '';
    localStorage.setItem('state', JSON.stringify(playerObject));
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
  resetScoreDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  resetScoreDispatch: () => actions.resetScoreAction(),
};

export default connect(null, mapDispatchToProps)(PlayAgain);
