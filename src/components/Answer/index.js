/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Answer extends React.Component {
  constructor() {
    super();
    this.state = {
      ansersStyle: ['green', 'pink', 'orange', 'purple'],
      questionAnsered: false,
    };
    this.handleAnswerStyle = this.handleAnswerStyle.bind(this);
    this.handleDataTestId = this.handleDataTestId.bind(this);
  }

  handleAnswerStyle(index) {
    const { ansersStyle, questionAnsered } = this.state;
    const { curQuestion } = this.props;
    const answers = [...curQuestion.incorrect_answers, curQuestion.correct_answer];

    if (!questionAnsered) {
      return (`answer-box ${ansersStyle[index]}`);
    }
    if (answers[index] === curQuestion.correct_answer) {
      return (`answer-box ${ansersStyle[index]} right`);
    }
    return (`answer-box ${ansersStyle[index]} wrong`);
  }

  handleDataTestId(index) {
    const { curQuestion } = this.props;
    const incorrectAnswers = [...curQuestion.incorrect_answers];
    const answers = [...curQuestion.incorrect_answers, curQuestion.correct_answer];

    return ((answers[index] === curQuestion.correct_answer)
      ? ('correct-answer')
      : (`wrong-answer ${incorrectAnswers.indexOf(answers[index])}`));
  }

  render() {
    const { curQuestion, click } = this.props;
    const answers = [...curQuestion.incorrect_answers, curQuestion.correct_answer];

    return (
      <section className="answer-section">
        {answers.map((question, index) => (
          <div
            role="button"
            tabIndex={ 0 }
            key={ index }
            className={ this.handleAnswerStyle(index) }
            data-testid={ this.handleDataTestId(index) }
            onClick={ () => {
              click(index);
              this.setState({ questionAnsered: true });
            } }
            onKeyDown={ () => {
              click(index);
              this.setState({ questionAnsered: true });
            } }
          >
            <p className="message">{ answers[index] }</p>
          </div>
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
};

Answer.defaultProps = {
  correct_answer: '',
  incorrect_answers: '',
  curQuestion: {},
};

export default Answer;
