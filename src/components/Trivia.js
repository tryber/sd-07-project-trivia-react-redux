import React, { Component } from 'react';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.renderAlternatives = this.renderAlternatives.bind(this);
    this.state = {
      questionNumber: 0,
    };
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
    // const alternativesSorted = suffle(alternatives);
    // return alternativesSorted;
    return alternatives;
  }

  render() {
    const { response } = this.props;
    const { results } = response;
    const { questionNumber } = this.state;
    return (
      <div>
        <p data-testid="question-category">{results[questionNumber].category}</p>
        <p data-testid="question-text">{results[questionNumber].question}</p>
        <div>
          { this.renderAlternatives() }
        </div>

      </div>
    );
  }
}

export default Trivia;
