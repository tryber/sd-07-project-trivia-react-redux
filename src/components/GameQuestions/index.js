import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTriviaQuestions } from '../../store/ducks/triviaQuestions';
import './GameQuestions.css';
import Timer from '../Timer';

class GameQuestions extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: 0,
      revealAnswer: false,
    };
    this.timeOver = this.timeOver.bind(this);
  }

  async componentDidMount() {
    const { getTriviaQuestions } = this.props;
    await getTriviaQuestions();
  }

  timeOver() {
    this.setState({ revealAnswer: true });
  }

  render() {
    const { questions, isLoading } = this.props;
    const { currentQuestion, revealAnswer } = this.state;
    if (isLoading) { return <h1>Loading...</h1>; }
    return (
      <>
        <h3>
          Category:
          <span data-testid="question-category">
            {questions.length && questions[currentQuestion].category}
          </span>
        </h3>
        <h3>
          {`Question ${currentQuestion + 1}: `}
          <span data-testid="question-text">
            {questions.length && questions[currentQuestion].question}
          </span>
        </h3>
        <h3>
          Answers:
          <span data-testid="question-text">
            {
              questions.length
              && questions[currentQuestion].randomAnswers
                .map((answer) => (
                  <button
                    type="button"
                    disabled={ revealAnswer }
                    className={ (revealAnswer
                      && (answer.correct ? 'correctAnswer' : 'wrongAnswer')).toString() }
                    key={ answer.text }
                    data-testid={ answer.dataTestid }
                    onClick={ () => this.setState({ revealAnswer: true }) }
                  >
                    {answer.text}
                  </button>))
            }
          </span>
        </h3>
        <Timer stopTimer={ revealAnswer } handleTimeOver={ this.timeOver } />
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
