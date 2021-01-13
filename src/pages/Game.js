import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Game extends Component {
  constructor(props) {
    super(props);
    this.renderAlternatives = this.renderAlternatives.bind(this);
  }

  getPlayerProfile() {
    return JSON.parse(localStorage.getItem('state'));
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  renderAlternatives(correctAnswer, incorrectAnswers) {
    const alternatives = [];
    alternatives.push(
      <button type="button" data-testid="correct-answer">{correctAnswer}</button>,
    );
    incorrectAnswers.forEach((answer, index) => {
      alternatives.push(
        <button type="button" data-testid={ `wrong-answer-${index}` }>{answer}</button>,
      );
    });
    const alternativesSorted = this.shuffle(alternatives);
    return alternativesSorted;
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header playerProfile={ this.getPlayerProfile() } />
        <Trivia
          renderAlternatives={ this.renderAlternatives }
          questions={ questions }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

Game.propTypes = {
  questions: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Game);
