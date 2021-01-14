import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedbacks extends Component {
  render() {
    const minScore = 3;
    const { score, history } = this.props;

    if (score >= minScore) {
      return (
        <div>
          <h1 data-testid="feedback-text">
            Mandou bem!
          </h1>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Jogar Novamente
          </button>
        </div>

      );
    }
    return (
      <div>
        <h1 data-testid="feedback-text">
          Podia ser melhor...
        </h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar Novamente
        </button>
      </div>

    );
  }
}

Feedbacks.propTypes = {
  score: PropTypes.number.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.game.score,
});

export default connect(mapStateToProps)(Feedbacks);
