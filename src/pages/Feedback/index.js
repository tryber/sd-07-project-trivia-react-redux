import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from '../../components';

class Feedback extends Component {
  feedbackScore() {
    const { assertions } = this.props;
    const minScore = 3;
    if (assertions < minScore) {
      return (
        <h2 data-testid="feedback-text">Podia ser melhor...</h2>
      );
    }
    return (
      <h2 data-testid="feedback-text">Mandou bem!</h2>
    );
  }

  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <h1>Tela de Feedback</h1>
        { this.feedbackScore() }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Feedback);
