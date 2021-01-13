import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import '../App.css';
import GameHeader from '../components/GameHeader';

class Game extends Component {
  constructor() {
    super();
    this.renderAllDataQuestion = this.renderAllDataQuestion.bind(this);
    this.handleUserAnswer = this.handleUserAnswer.bind(this);
    this.state = {
      questionIndex: 0,
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  renderAllDataQuestion() {
    // console.log()
    const { questionIndex } = this.state;
    const { questions } = this.props;

    if (questions.results) {
      const correctAnswer = (
        <button  type="button" 
         data-testid="correct-answer" onClick={this.handleUserAnswer} key='correct' id="ok">
          { questions.results[questionIndex].correct_answer }
        </button>
      );
      const wrongAnswer = questions.results[questionIndex].incorrect_answers.map((answer, index) => (
        <button   onClick={this.handleUserAnswer} type="button"  key={ answer } 
        data-testid={ `wrong-answer-${index}`} id="notOk">
          {answer}
        </button>
      ));
      return [correctAnswer, ...wrongAnswer];
    }
  }

  handleUserAnswer() {
    document.querySelectorAll('button').forEach((button) => {
      const { id } = button;
      if (id === 'ok') {
        button.classList.add('btnColorGreen')
      }
      button.classList.add('btnColorRed')
    });
  }

  render() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    return questions.results ? (
      <div>
        <GameHeader />
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

Game.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.array,
  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
