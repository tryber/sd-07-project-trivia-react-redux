import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Quiz.css';

class Quiz extends Component {
  constructor() {
    super();

    this.state = {
      answered: false,
      colorCorrect: '',
      colorIncorrect: '',
    };

    this.answerColor = this.answerColor.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  handleClick() {
    this.setState({
      answered: true,
    });
  }

  answerColor() {
    // const { results } = this.props;
    // const { correct_answer: correctAnswer } = results;

    // if (target.innerText !== correctAnswer) {
    // }

    this.setState({
      colorIncorrect: 'answer-wrong',
      colorCorrect: 'answer-correct',
    });

    this.handleClick();
  }

  nextButton() {
    this.setState({
      answered: false,
      colorCorrect: '',
      colorIncorrect: '',
    });
  }

  render() {
    const { answered, colorCorrect, colorIncorrect } = this.state;
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
          <button
            className={ colorCorrect }
            key={ number }
            data-testid="correct-answer"
            type="button"
            onClick={ this.answerColor }
            disabled={ answered }
          >
            { correctAnswer }
          </button>);
      }
      return (
        <button
          className={ colorIncorrect }
          key={ number }
          data-testid={ `wrong-answer-${number}` }
          type="button"
          onClick={ this.answerColor }
          disabled={ answered }
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
        <button
          type="button"
          onClick={ () => { this.nextButton(); nextQuestion(); } }
          hidden={ !answered }
          data-testid="btn-next"
        >
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
