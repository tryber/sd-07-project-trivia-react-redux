import React, { Component } from 'react';

class Questions extends Component {
  render() {
    const {
      category,
      question,
      difficulty,
      correct_answer,
      incorrect_answers,
    } = this.props;
    return (
      <div>
        <div data-testid="question-category">Categoria: {category}</div>
        <div data-testid="question-difficulty">Dificuldade: {difficulty}</div>
        <div data-testid="question-text"> Pergunta: {question}</div>
        <div>
        <button data-testid="correct-answer">{correct_answer}</button>
        {incorrect_answers.map((incorrect) => (
          <button key={incorrect} data-testid={`wrong-answer-`}>
            {incorrect}
          </button>
        ))}
        </div>
      </div>
    );
  }
}

export default Questions;
