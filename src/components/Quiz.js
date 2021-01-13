import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Quiz.css';

class Quiz extends Component {
  // constructor() {
  //  super();
  //  this.state = {
  //    answered: false,
  //  };
  // }

  // handleClick() {
  // const { answered } = this.state;
  //  this.setState({
  //    answered: true,
  //  });
  // }

  render() {
    // const { answered } = this.state;
    const { results, nextQuestion } = this.props;
    const { correct_answer: correctAnswer } = results;
    const { incorrect_answers: incorrectAnswers } = results;
    const { question, category, difficulty } = results;
    const allQuestions = [correctAnswer, ...incorrectAnswers];
    const magicNumber = 0.5;
    const allIndex = allQuestions
      .map((anyQuestion) => allQuestions
        .indexOf(anyQuestion))
      .sort(() => Math.random() - magicNumber);
    const shuffledArray = allIndex.map((shuffledNumber) => allQuestions[shuffledNumber]);
    const renderQuestions = (questionToRender, number) => {
      if (questionToRender === correctAnswer) {
        return (
          <button className="answer-correct" data-testid="correct-answer" type="button">
            { correctAnswer }
          </button>);
      }
      return (
        <button
          className="answer-wrong"
          data-testid={ `wrong-answer-${number}` }
          type="button"
        >
          { questionToRender }
        </button>);
    };
    return (
      <div>
        <p data-testid="question-text">{ question }</p>
        <p>{ difficulty }</p>
        <p data-testid="question-category">{ category }</p>
        {shuffledArray.map((oneQuestion, index) => renderQuestions(oneQuestion, index))}
        <button type="button" onClick={ nextQuestion }>
          Próxima
        </button>
      </div>
    );
  }
}

export default Quiz;

Quiz.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextQuestion: PropTypes.func.isRequired,
};
