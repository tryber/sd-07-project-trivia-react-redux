import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Answer extends React.Component {
  render() {
    const { curQuestion } = this.props;
    const answers = [...curQuestion.incorrect_answers, curQuestion.correct_answer];
    const incorrectAnswers = [...curQuestion.incorrect_answers];
    const ansersStyle = ['green', 'pink', 'orange', 'purple'];
    return (
      <section className="answer-section">
        {answers.map((question, index) => (
          <div
            key={ index }
            className={ `answer-box ${ansersStyle[index]}` }
            data-testid={
              (answers[index] === curQuestion.correct_answer)
                ? ('correct-answer')
                : (`wrong-answer ${incorrectAnswers.indexOf(answers[index])}`)
            }
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
  curQuestion: PropTypes.objectOf,
};

Answer.defaultProps = {
  correct_answer: '',
  incorrect_answers: '',
  curQuestion: {},
};

export default Answer;
