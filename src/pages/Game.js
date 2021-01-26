import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions, getScore, updateCorrectCount } from '../actions';
import GameHeader from '../components/GameHeader';
import Loading from '../components/Loading';
import '../css/App.css';
import '../css/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.renderAllDataQuestion = this.renderAllDataQuestion.bind(this);
    this.handleUserAnswer = this.handleUserAnswer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.timer = this.timer.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleClasses = this.handleClasses.bind(this);
    this.savingShuffleAnswers = this.savingShuffleAnswers.bind(this);
    this.convertQuestionAndAnswers = this.convertQuestionAndAnswers.bind(this);
    this.stopTimer = this.stopTimer.bind(this);

    this.state = {
      questionIndex: 0,
      timer: 30,
      runingTimer: '',
      disableButton: true,
      shuffleAnswers: [],
      correctAnswer: '',
      showBtn: false,
    };
  }

  async componentDidMount() {
    const { getQuestions } = this.props;
    await getQuestions();
    this.savingShuffleAnswers();
    this.renderTime();
  }

  componentDidUpdate() {
    this.timer();
  }

  savingShuffleAnswers() {
    // console.log(this.renderAllDataQuestion());
    this.setState({
      shuffleAnswers: [...this.renderAllDataQuestion()],
    });
  }

  timer() {
    const { timer } = this.state;
    const initialSecondEnableButton = 25;
    const lastSecondDisableButton = 0;
    if (timer === lastSecondDisableButton) {
      this.handleUserAnswer();
      this.setState((prevState) => ({
        ...prevState,
        timer: 'Acabou o Tempo',
        disableButton: true,
      }));
    }
    if (timer === initialSecondEnableButton) {
      this.setState({
        timer: 24,
        disableButton: false,
      });
    }
  }

  handleClasses(type) {
    document.querySelectorAll('.btnAnswer').forEach((button) => {
      if (type === 'add') {
        const { id } = button;
        if (id === 'ok') {
          button.classList.add('btnColorGreen');
        }
        button.classList.add('btnColorRed');
      } else {
        button.classList.remove('btnColorGreen');
        button.classList.remove('btnColorRed');
      }
    });
  }

  handleUserAnswer() {
    const { runingTimer } = this.state;
    this.stopTimer(runingTimer);
    this.handleClasses('add');
    this.setState((prevState) => ({
      ...prevState,
      showBtn: true,
      disableButton: true,
    }));
  }

  nextQuestion() {
    const { questions, history } = this.props;
    const { questionIndex } = this.state;
    const questionsLength = questions.results.length - 1;
    // console.log(typeof history);
    this.renderTime();
    if (questionIndex === questionsLength) return history.push('/feedback');
    this.setState((previous) => ({
      ...previous,
      questionIndex: previous.questionIndex + 1,
      timer: 30,
      showBtn: false,
      disableButton: true,
    }),
    () => {
      this.handleClasses('remove');
      this.savingShuffleAnswers();
    });
  }

  calculateScore() {
    const { questions, score, sendScore } = this.props;
    const { timer } = this.state;
    const three = 3;
    const ten = 10;
    const questionLevel = questions.results[0].difficulty;
    let multiplier = 1;
    if (questionLevel === 'easy') multiplier = 1;
    if (questionLevel === 'medium') multiplier = 2;
    if (questionLevel === 'hard') multiplier = three;
    const finalScore = score + (ten + timer * multiplier);
    sendScore(finalScore);
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  stopTimer(interval) {
    clearInterval(interval);
  }

  convertQuestionAndAnswers(question) {
    const errors = ['&#039;', '&quot;'];
    let finalQuestion = question;
    errors.forEach((error) => {
      if (question.includes(error)) {
        const newQuestion = finalQuestion.split(error);
        finalQuestion = newQuestion.join('');
      }
    });
    // console.log(question);
    return finalQuestion;
  }

  renderAllDataQuestion() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    // console.log(questions);

    if (questions.results) {
      const correctAnswer = questions.results[questionIndex].correct_answer;
      const wrongAnswer = questions.results[questionIndex].incorrect_answers
        .map((answer) => answer);

      this.setState({
        correctAnswer,
      });

      const arrayAnswers = this.shuffle([...wrongAnswer, correctAnswer]);
      return arrayAnswers;
    }
  }

  renderTime() {
    const secondTimerFunction = 1000;
    const finishTimer = 'Acabou o Tempo';
    const objTimer = setInterval(() => {
      const { timer, runingTimer } = this.state;
      if (timer !== finishTimer) {
        // console.log(timer);
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      } else {
        // console.log('entrou');
        this.stopTimer(runingTimer);
      }
    }, secondTimerFunction);

    this.setState({
      runingTimer: objTimer,
    });
  }

  render() {
    const {
      questionIndex,
      timer,
      shuffleAnswers,
      correctAnswer,
      disableButton,
      showBtn,
    } = this.state;
    const { questions, sendCorrectAnswers } = this.props;
    return questions.results ? (
      <div>
        <GameHeader />
        <section className="container-game">
          <header className="container-header-game">
            <h1>TELA DE JOGO</h1>
            <h3 data-testid="question-category">
              {questions.results[questionIndex].category}
            </h3>
          </header>
          <section className="container-questions-answers">
            <h2 data-testid="question-text">
              {this.convertQuestionAndAnswers(questions.results[questionIndex].question)}
            </h2>
            <div className="container-buttons">
              {
                shuffleAnswers.map((answer, index) => {
                  if (answer === correctAnswer) {
                    return (
                      <div key={ answer }>
                        <button
                          type="button"
                          className="btnAnswer"
                          id="ok"
                          key="correct"
                          disabled={ disableButton }
                          onClick={ () => {
                            this.handleUserAnswer();
                            this.calculateScore();
                            sendCorrectAnswers();
                          } }
                          data-testid="correct-answer"
                        >
                          {this.convertQuestionAndAnswers(answer)}
                        </button>
                      </div>
                    );
                  }
                  return (
                    <div key={ answer }>
                      <button
                        type="button"
                        className="btnAnswer"
                        id="notOk"
                        key={ answer }
                        disabled={ disableButton }
                        onClick={ this.handleUserAnswer }
                        data-testid={ `wrong-answer-${index}` }
                      >
                        {this.convertQuestionAndAnswers(answer)}
                      </button>
                    </div>
                  );
                })
              }
            </div>
          </section>
        </section>
        <section className="timer-nextQuestion-container">
          <p>{timer}</p>
          { showBtn && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Próxima pergunta
            </button>
          )}
        </section>
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = ({ gameReducer, scoreReducer }) => ({
  questions: gameReducer.questions,
  score: scoreReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
  sendScore: (score) => dispatch(getScore(score)),
  sendCorrectAnswers: () => dispatch(updateCorrectCount()),
});

Game.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(Object),
  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  sendScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendCorrectAnswers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
