/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Answer extends React.Component {
  constructor() {
    super();
    this.state = {
      ansersStyle: ['green', 'pink', 'orange', 'purple'],
    };
    this.handleAnswerStyle = this.handleAnswerStyle.bind(this);
    this.handleDataTestId = this.handleDataTestId.bind(this);
  }

  handleAnswerStyle(index) {
    const { ansersStyle } = this.state;
    const { questionAnsered } = this.props;
    const { answers, curQuestion } = this.props;
    if (!questionAnsered) {
      return (`answer-box ${ansersStyle[index]}`);
    }
    if (answers[index] === curQuestion.correct_answer) {
      return (`answer-box ${ansersStyle[index]} right`);
    }
    return (`answer-box ${ansersStyle[index]} wrong`);
  }

  handleDataTestId(index) {
    const { curQuestion, answers } = this.props;
    const incorrectAnswers = [...curQuestion.incorrect_answers];
    return ((answers[index] === curQuestion.correct_answer)
      ? ('correct-answer')
      : (`wrong-answer ${incorrectAnswers.indexOf(answers[index])}`));
  }

  render() {
    const { answers, click, borderWrong, questionAnsered } = this.props;
    return (
      <section className="answer-section">
        {answers.map((question, index) => (
          <button
            type="button"
            tabIndex={ 0 }
            key={ index }
            className={ `${borderWrong} ${this.handleAnswerStyle(index)}` }
            data-testid={ this.handleDataTestId(index) }
            disabled={ questionAnsered }
            onClick={ () => {
              click(index);
            } }
            onKeyDown={ () => {
              click(index);
            } }
          >
            <p className="message">{ answers[index] }</p>
          </button>
        ))}
      </section>
    );
  }
}

Answer.propTypes = {
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.string,
  curQuestion: PropTypes.objectOf(Array),
  click: PropTypes.func.isRequired,
  borderWrong: PropTypes.string,
  questionAnsered: PropTypes.bool.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Answer.defaultProps = {
  correct_answer: '',
  incorrect_answers: '',
  curQuestion: {},
  borderWrong: '',
};

export default Answer;
