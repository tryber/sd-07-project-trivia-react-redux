import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as triviaAPI from '../../services/triviaAPI';
import { nextQuestion } from '../../redux/actions';
import CorrectAnswer from './CorrectAnswer';
import WrongAnswer from './WrongAnswer';
import Timer from './Timer';

class Questions extends Component {
  constructor() {
    super();
    this.fetchTriviaAPI = this.fetchTriviaAPI.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.randomizeAnswers = this.randomizeAnswers.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);

    this.state = {
      questions: [],
      currentQuestion: 0,
      isLoading: true,
      numberArray: [],
    };
  }

  componentDidMount() {
    this.fetchTriviaAPI();
  }

  async fetchTriviaAPI() {
    const quantityOfQuestions = 5;
    const token = localStorage.getItem('token');
    const requestQuestions = await triviaAPI.getQuestions(quantityOfQuestions, token);
    this.setState({
      questions: requestQuestions.results,
      isLoading: false,
      setRestart: false,
    });
    this.randomizeAnswers();
  }

  // shuffleArray from https://stackoverflow.com/a/12646864
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  randomizeAnswers() {
    const { currentQuestion, questions } = this.state;
    const maxAnswers = questions[currentQuestion].incorrect_answers.length;
    let array = [];
    for (let i = 0; i <= maxAnswers; i += 1) {
      array.push(i);
    }
    array = this.shuffleArray(array);
    this.setState({ numberArray: array });
  }

  handleNextQuestion() {
    const { questions, currentQuestion } = this.state;
    const { nextQuestion: actionNextQuestion, history } = this.props;

    if (currentQuestion < questions.length - 1) {
      this.setState(
        ({ currentQuestion: prevValue }) => ({
          currentQuestion: prevValue + 1,
          setRestart: true,
        }),
        () => {
          this.setState({ setRestart: false });
          actionNextQuestion();
          this.randomizeAnswers();
        },
      );
    } else {
      actionNextQuestion();
      history.push('/feedback');
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return '';
    const { currentQuestion, questions, numberArray, setRestart } = this.state;
    const { difficulty } = questions[currentQuestion];
    const { isAnswered } = this.props;
    return (
      <main className="question__container">
        <div className="question__content">
          <div className="question">
            <div className="question__info">
              <div
                className="question__category"
                data-testid="question-category"
              >
                { questions[currentQuestion].category }
              </div>
              <div data-testid="question-text">
                { questions[currentQuestion].question }
              </div>
            </div>
            <Timer restart={ setRestart } />
          </div>
          <div className="answers__container">
            <div className="answers__content">
              { numberArray.map((value) => {
                if (value === Math.max(...numberArray)) {
                  return (
                    <CorrectAnswer
                      key={ value }
                      difficulty={ difficulty }
                      answer={ questions[currentQuestion].correct_answer }
                    />
                  );
                }
                return (
                  <WrongAnswer
                    key={ value }
                    index={ value }
                    answer={ questions[currentQuestion].incorrect_answers[value] }
                  />
                );
              })}
            </div>
            <div className="question__next__container">
              {
                isAnswered && (
                  <button
                    type="button"
                    className="question__next"
                    data-testid="btn-next"
                    onClick={ () => this.handleNextQuestion() }
                  >
                    Próxima
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  isAnswered: state.questionAnswererd.isAnswered,
});

const mapDispatchToProps = {
  nextQuestion,
};

Questions.propTypes = {
  isAnswered: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
