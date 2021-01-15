import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import { Redirect } from 'react-router-dom';
import { addScore, getQuestions } from '../../redux/actions/gameActions';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    const limit = 4;
    this.state = {
      correct: Math.floor(Math.random() * limit),
      actual: 0,
      solved: false,
      timer: 30,
      idTimer: 0,
    };

    this.questFrame = this.questFrame.bind(this);
    this.questFrameSolved = this.questFrameSolved.bind(this);
    this.renderScreen = this.renderScreen.bind(this);
    this.starTimer = this.starTimer.bind(this);
    this.calcScore = this.calcScore.bind(this);
  }

  componentDidMount() {
    const { playerToken, getQuest } = this.props;
    // const decrement = 1000;
    getQuest(playerToken);
    this.starTimer();
  }

  starTimer() {
    const timeDesc = 1000;
    const tempId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer > 0) {
          return { timer: prevState.timer - 1 };
        }
      });
    }, timeDesc);

    this.setState({ idTimer: tempId });
  }

  calcScore() {
    const { questions, addPoints } = this.props;
    const { idTimer, actual, timer } = this.state;
    clearInterval(idTimer);
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const minimumQuest = 10;

    let valueQuest;

    switch (questions[actual].difficulty) {
    case 'easy':
      valueQuest = easy;
      break;
    case 'medium':
      valueQuest = medium;
      break;
    case 'hard':
      valueQuest = hard;
      break;

    default:
      break;
    }

    const calcQuest = minimumQuest + timer * valueQuest;

    addPoints(calcQuest);

    // localStorage.setItem('state', `player: {
    //   name: ${playerName},
    //   assertions: ${assertions},
    //   score: ${scoreSession},
    //   gravatarEmail: ${playerEmail},
    // }`);
  }

  questFrame() {
    // return <p>Loading</p>;

    const { questions } = this.props;
    const { actual, correct } = this.state;
    let counter = 0;

    // nada elegante
    const arrayDefault = ['', '', '', ''];

    if (questions.length > 0) {
      return questions[actual].type === 'boolean' ? (
        <div>
          <button
            onClick={ () => {
              if (questions[actual].correct_answer === 'True') this.calcScore();
              this.setState({ solved: true });
            } }
            type="button"
            data-testid={
              // eslint-disable-next-line max-len
              questions[actual].correct_answer === 'True'
                ? 'correct-answer'
                : 'wrong-answer'
            }
          >
            Verdadeiro
          </button>
          <button
            onClick={ () => {
              if (questions[actual].correct_answer === 'False') { this.calcScore(); }
              this.setState({ solved: true });
            } }
            type="button"
            data-testid={
              // eslint-disable-next-line max-len
              questions[actual].correct_answer === 'False'
                ? 'correct-answer'
                : 'wrong-answer'
            }
          >
            False
          </button>
        </div>
      ) : (
        <div>
          {arrayDefault.map((elem, index) => {
            if (index === correct) {
              return (
                <button
                  onClick={ () => {
                    this.calcScore();
                    this.setState({ solved: true });
                  } }
                  key={ questions[actual].correct_answer }
                  type="button"
                  data-testid="correct-answer"
                >
                  {questions[actual].correct_answer}
                </button>
              );
            }
            counter += 1;
            return (
              <button
                onClick={ () => this.setState({ solved: true }) }
                key={ questions[actual].incorrect_answers[counter - 1] }
                type="button"
                data-testid={ `wrong-answer-${counter - 1}` }
              >
                {questions[actual].incorrect_answers[counter - 1]}
              </button>
            );
          })}
        </div>
      );
    }
  }

  questFrameSolved() {
    const { questions } = this.props;
    const { actual, correct } = this.state;
    let counter = 0;

    // nada elegante
    const arrayDefault = ['', '', '', ''];

    if (questions.length > 0) {
      return questions[actual].type === 'boolean' ? (
        <div>
          <button
            type="button"
            disabled
            className={
              // eslint-disable-next-line max-len
              questions[actual].correct_answer === 'True'
                ? 'correct-answer'
                : 'wrong-answer'
            }
            data-testid={
              // eslint-disable-next-line max-len
              questions[actual].correct_answer === 'True'
                ? 'correct-answer'
                : 'wrong-answer'
            }
          >
            Verdadeiro
          </button>
          <button
            type="button"
            disabled
            className={
              // eslint-disable-next-line max-len
              questions[actual].correct_answer === 'False'
                ? 'correct-answer'
                : 'wrong-answer'
            }
            data-testid={
              // eslint-disable-next-line max-len
              questions[actual].correct_answer === 'False'
                ? 'correct-answer'
                : 'wrong-answer'
            }
          >
            False
          </button>
        </div>
      ) : (
        <div>
          {arrayDefault.map((elem, index) => {
            if (index === correct) {
              return (
                <button
                  disabled
                  key={ questions[actual].correct_answer }
                  className="correct-answer"
                  type="button"
                  data-testid="correct-answer"
                >
                  {questions[actual].correct_answer}
                </button>
              );
            }
            counter += 1;
            return (
              <button
                disabled
                key={ questions[actual].incorrect_answers[counter - 1] }
                className="wrong-answer"
                type="button"
                data-testid={ `wrong-answer-${counter - 1}` }
              >
                {questions[actual].incorrect_answers[counter - 1]}
              </button>
            );
          })}
        </div>
      );
    }
  }

  renderScreen() {
    const { solved, timer } = this.state;

    return solved || timer === 0 ? this.questFrameSolved() : this.questFrame();
  }

  render() {
    const { playerEmail, playerName, assertions, scoreSession } = this.props;
    const { solved, actual } = this.state;
    const limitQuest = 4;
    const player = {
      name: playerName,
      assertions,
      score: scoreSession,
      gravatarEmail: playerEmail,
    };

    localStorage.setItem('state', JSON.stringify({ player }));

    const { timer } = this.state;

    if (actual > limitQuest) return <Redirect to="/feedback" />;

    return (
      <>
        <p data-testid="question-category">Categoria</p>
        <p data-testid="question-text">Pergunta</p>
        {this.renderScreen()}
        {/* {this.questFrame()} */}
        <h2>{timer}</h2>
        {solved && (
          <button
            type="button"
            onClick={ () => this.setState((prevState) => ({
              actual: prevState.actual + 1,
              timer: 30,
              solved: false,
            })) }
            data-testid="btn-next"
          >
            Próximo
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playerToken: state.user.token,
  questions: state.session.questions,
  scoreSession: state.session.score,
  assertions: state.session.rightAnswers,
  playerName: state.user.userName,
  playerEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  getQuest: (token) => dispatch(getQuestions(token)),
  addPoints: (points) => dispatch(addScore(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);

GameScreen.propTypes = {
  scoreSession: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  addPoints: PropTypes.func.isRequired,
  getQuest: PropTypes.func.isRequired,
  playerToken: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
