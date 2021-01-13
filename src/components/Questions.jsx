import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionCount } from '../store/reducer/user.action';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const { dispatchQuestionCount } = this.props;
    dispatchQuestionCount();
  }

  render() {
    const { questionCounter, questions } = this.props;
    if (!questions) {
      return <div>Loading...</div>;
    }
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionCounter];
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleButtonClick }
        >
          { correctAnswer }
        </button>
        {
          incorrectAnswers
            .map((answer, index) => (
              <button
                key={ answer }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                { answer }
              </button>))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.results,
  questionCounter: state.userReducer.questionCount,
  isFetching: state.triviaReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestionCount: () => dispatch(questionCount()),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchQuestionCount: PropTypes.func.isRequired,
  questionCounter: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
