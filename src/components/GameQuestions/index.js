import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTriviaQuestions } from '../../store/ducks/triviaQuestions';

class GameQuestions extends Component {
  async componentDidMount() {
    const { getTriviaQuestions } = this.props;
    await getTriviaQuestions();
  }

  randomAnswers(correctAnswer, incorrectAnswers) {
    const randomAnswers = [];
    randomAnswers.push({
      text: correctAnswer,
      dataTestid: 'correct-answer',
      randomIndex: Math.random(),
    });
    incorrectAnswers.forEach((answer, index) => randomAnswers.push({
      text: answer,
      dataTestid: `wrong-answer-${index}`,
      randomIndex: Math.random(),
    }));

    return randomAnswers.sort((a, b) => a.randomIndex - b.randomIndex);
  }

  render() {
    const { questions, isLoading } = this.props;
    if (isLoading) { return <h1>Loading...</h1>; }
    return (
      <>
        <h3>
          Category:
          <span data-testid="question-category">
            {questions.length && questions[0].category}
          </span>
        </h3>
        <h3>
          Question:
          <span data-testid="question-text">
            {questions.length && questions[0].question}
          </span>
        </h3>
        <h3>
          Answers:
          <span data-testid="question-text">
            {
              questions.length
              && this.randomAnswers(
                questions[0].correct_answer,
                questions[0].incorrect_answers,
              )
                .map((answer) => (
                  <button
                    type="button"
                    key={ answer.text }
                    data-testid={ answer.dataTestid }
                  >
                    {answer.text}
                  </button>))
            }
          </span>
        </h3>
      </>
    );
  }
}

GameQuestions.propTypes = {
  getTriviaQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.triviaQuestions.questions,
  isLoading: state.triviaQuestions.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getTriviaQuestions: () => dispatch(fetchTriviaQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
