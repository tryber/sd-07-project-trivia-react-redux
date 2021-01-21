import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.css';

export default class Questions extends Component {
  constructor() {
    super();
    this.state = {
      // shuffled: false,
      // shuffledAnswers: [],
    };

    // this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  componentDidMount() {
    // this.shuffleAnswers();
  }

  render() {
    const {
      question,
      timer,
      nextQuestion,
      answeredQuestionFunction,
      questionWasAnswered,
      shuffledAnswers,
      isLoading } = this.props;
    // const { shuffledAnswers } = this.state;
    console.log('--questions--');
    console.log(question);
    console.log(shuffledAnswers);
    if (question) {
      return (
        <div>
          <h3 data-testid="question-category">{question.category}</h3>
          <h4 data-testid="question-text">{question.question}</h4>
          {!isLoading && shuffledAnswers.map((answer, index) => {
            if (answer === question.correct_answer) {
              return (
                <button
                  name="correct"
                  type="button"
                  key={ index }
                  data-testid="correct-answer"
                  className={ questionWasAnswered ? 'correct' : null }
                  onClick={ (e) => answeredQuestionFunction(e) }
                  disabled={ timer === 0 }
                >
                  {answer}
                </button>
              );
            }
            return (
              <button
                name="incorrect"
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                onClick={ (e) => answeredQuestionFunction(e) }
                className={ questionWasAnswered ? 'incorrect' : null }
                disabled={ timer === 0 }
              >
                {answer}
              </button>
            );
          })}
          <button
            data-testid="btn-next"
            type="button"
            hidden={ !questionWasAnswered }
            onClick={ nextQuestion }
          >
            Próxima
          </button>
        </div>
      );
    }
    return (
      <h2>Loading...</h2>
    );
  }
}

Questions.propTypes = {
  question: PropTypes.arrayOf.isRequired,
  timer: PropTypes.number.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  answeredQuestionFunction: PropTypes.func.isRequired,
  questionWasAnswered: PropTypes.bool.isRequired,
  shuffledAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
