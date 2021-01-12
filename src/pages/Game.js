import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.renderAllDataQuestion = this.renderAllDataQuestion.bind(this);
    this.state = {
      questionIndex: 0,
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  renderAllDataQuestion() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    if (questions.results) {
      const correctAnswer = (
        <button type="button" data-testid="correct-answer">
          { questions.results[questionIndex].correct_answer }
        </button>
      );
      const wrongAnswer = questions.results[
        questionIndex
      ].incorrect_answers.map((answer, index) => (
        <button type="button" key={ answer } data-testid={ `wrong-answer-${index}` }>
          {answer}
        </button>
      ));
      return [correctAnswer, ...wrongAnswer];
    }
  }

  render() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    return questions.results ? (
      <div>
        <h1>TELA DE JOGO</h1>
        <h3 data-testid="question-category">
          {questions.results[questionIndex].category}
        </h3>
        <h2 data-testid="question-text">
          {questions.results[questionIndex].question}
        </h2>
        <div>{this.renderAllDataQuestion()}</div>
      </div>
    ) : (
      <p>loading</p>
    );
  }
}
const mapStateToProps = ({ gameReducer }) => ({
  questions: gameReducer.questions,
  isFetching: gameReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(Object).isRequired,
  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
};
