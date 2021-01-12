import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
  render() {
    const { questions, currentQuestion } = this.props;
    return (
      <div>
        <h1 data-testid="question-category">{questions[currentQuestion].category}</h1>
        <h1 data-testid="question-text">{questions[currentQuestion].question}</h1>
        <button
          type="button"
          data-testid="correct-answer"
        >
          {questions[currentQuestion].correct_answer}
        </button>
        {questions[currentQuestion].incorrect_answers.map((e, i) => {
          const datatestid = `wrong-answer-${i}`;
          return <button key={ i } type="button" data-testid={ datatestid }>{e}</button>;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

Question.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      type: PropTypes.string,
      difficulty: PropTypes.string,
      question: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Question);
