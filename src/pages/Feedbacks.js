import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedbacks extends Component {
  render() {
    const minScore = 3;
    const { score } = this.props;

    if (score >= minScore) {
      return (
        <h1 data-testid="feedback-text">
          Mandou bem!
        </h1>
      );
    }
    return (
      <h1 data-testid="feedback-text">
        Podia ser melhor...
      </h1>
    );
  }
}

Feedbacks.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.game.score,
});

export default connect(mapStateToProps)(Feedbacks);
