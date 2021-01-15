import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.css';

export default class Questions extends Component {
  constructor() {
    super();
    this.handleAnswer = this.handleAnswer.bind(this);
    this.state = {
      // shuffled: false,
      shuffledAnswers: [],
      questionWasAnswered: false,
    };

    this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  componentDidMount() {
    this.shuffleAnswers();
  }

  handleAnswer() {
    this.setState({ questionWasAnswered: true });
  }

  shuffleAnswers() {
    const { question } = this.props;
    // define keys to new array
    const correctAnswer = question.correct_answer;
    const incorrectAnswer = question.incorrect_answers;
    const concatAnswersArr = [correctAnswer, ...incorrectAnswer];
    // lint purpose - magic number
    const magic = 0.5;
    // sort concataned array to shuffle answers
    const sortedArr = concatAnswersArr.sort(() => Math.random() - magic);

    this.setState({
      // shuffled: true,
      shuffledAnswers: sortedArr,
    });
  }

  render() {
    const { question, timer, nextQuestion } = this.props;
    const { questionWasAnswered, shuffledAnswers } = this.state;
    console.log('alguma coisa', question);
    if (question) {
      return (
        <div>
          <h3 data-testid="question-category">{question.category}</h3>
          <h4 data-testid="question-text">{question.question}</h4>
          {shuffledAnswers && shuffledAnswers.map((answer, index) => {
            if (answer === question.correct_answer) {
              return (
                <button
                  name="correct"
                  type="button"
                  key={ index }
                  data-testid="correct-answer"
                  className={ questionWasAnswered ? 'correct' : null }
                  onClick={ () => {
                    this.handleAnswer();
                  } }
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
                onClick={ () => {
                  this.handleAnswer();
                } }
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
            onClick={ () => {
              nextQuestion();
            } }
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
};
