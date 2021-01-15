import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { handleAsyncQuestion,
  assertionCauting,
} from '../store/ducks/QuestionsRequest/actions';
import addScore from '../store/ducks/Score/actions';
import './styles.css';
import { setRank } from '../services/handleRank';

class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      category: 'Loading...',
      question: 'Loading...',
      // respCorrect: '',
      resps: [],
      dificulty: '',
      right: '',
      wrong: '',
      score: 0,
      buttonNext: false,
      id: 0,
      disabledTimeOut: false,
      timer: 30,
      assertions: 1,
    };
    this.handleNextQuest = this.handleNextQuest.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.disableQuestion = this.disableQuestion.bind(this);
    // this.nextQuestion = this.nextQuestion.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.MAX_ALTERNATIVES = 4;
    this.changeStyleCorrect = this.changeStyleCorrect.bind(this);
  }

  async componentDidMount() {
    const { actionRequest } = this.props;
    await actionRequest();
    // this.handleNextQuest();
    this.timeOut();
  }

  handleRedirect() {
    const { history, name, Score } = this.props;
    setRank({ name, Score });
    history.push('/feedback');
  }

  async handleNextQuest() {
    const { quest } = this.props;
    const { id } = this.state;
    const MAX_QUESTIONS = 4;
    await this.setState((state) => ({ id: state.id + 1 }));
    console.log(id);
    if (id >= MAX_QUESTIONS) {
      return this.handleRedirect();
    }
    if (quest.length === 0) {
      return null;
    }
    this.setState({
      category: quest[id].category,
      question: quest[id].question,
      dificulty: quest[id].difficulty,
      // respCorrect: quest[1].correct_answer,
      resps: [quest[id].correct_answer, ...quest[id].incorrect_answers],
      buttonNext: false,
      timer: 30,
      right: '',
      wrong: '',
      disabledTimeOut: false,
    });
  }

  async changeStyle({ target }) {
    const { timer, score } = this.state;
    const dez = 10;
    await this.setState({ right: 'right', wrong: 'wrong', buttonNext: true });

    if (target.className === 'right') {
      this.setState({
        score: score + (dez + (this.calcDificulty(target.name) * timer)),
      });
      this.callActionScore();
    }
  }

  async changeStyleCorrect({ target }) {
    const { timer, score, assertions } = this.state;
    const { correctAnswers } = this.props;
    const dez = 10;
    await this.setState({
      right: 'right',
      wrong: 'wrong',
      buttonNext: true,
      assertions: assertions + 1,
    });
    correctAnswers(assertions);
    if (target.className === 'right') {
      this.setState({
        score: score + (dez + (this.calcDificulty(target.name) * timer)),
      });
      this.callActionScore();
    }
  }

  callActionScore() {
    const { actionScore } = this.props;
    const { score } = this.state;
    actionScore(score);
  }

  calcDificulty(dificulty) {
    const um = 1;
    const dois = 2;
    const tres = 3;
    if (dificulty === 'hard') return tres;
    if (dificulty === 'medium') return dois;
    return um;
  }

  disableQuestion() {
    const { timer } = this.state;
    if (timer <= 0) {
      this.setState({ disabledTimeOut: true });
    }
  }

  timeOut() {
    const ONE_SEC = 1000;
    setInterval(() => {
      this.setState(
        (state) => ({
          timer: state.timer - 1,
        }),
        this.disableQuestion,
      );
    }, ONE_SEC);
  }

  render() {
    const {
      category,
      question,
      resps,
      right,
      wrong,
      disabledTimeOut,
      timer,
      buttonNext,
      dificulty,
    } = this.state;

    return (
      <div>
        <div>
          <Header />
        </div>

        <div>
          <div data-testid="question-category">{category}</div>
          <div data-testid="question-text">{question}</div>
          <div>
            <button
              className={ right }
              data-testid="correct-answer"
              type="button"
              name={ dificulty }
              onClick={ this.changeStyleCorrect }
              disabled={ disabledTimeOut }
            >
              {resps[0]}
            </button>
            <button
              className={ wrong }
              data-testid="wrong-answer-1"
              type="button"
              onClick={ this.changeStyle }
              disabled={ disabledTimeOut }
            >
              {resps[1]}
            </button>
            {resps.length === this.MAX_ALTERNATIVES && (
              <div>
                <button
                  className={ wrong }
                  data-testid="wrong-answer-2"
                  type="button"
                  onClick={ this.changeStyle }
                  disabled={ disabledTimeOut }
                >
                  {resps[2]}
                </button>
                <button
                  className={ wrong }
                  data-testid="wrong-answer-3"
                  type="button"
                  onClick={ this.changeStyle }
                  disabled={ disabledTimeOut }
                >
                  {resps[3]}
                </button>
              </div>
            )}
          </div>
          {buttonNext && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.handleNextQuest }
            >
              Próxima
            </button>
          )}
          {!disabledTimeOut && timer}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ QuestionRequest: { quest }, UserInfo: { name }, Score }) => ({
  quest,
  name,
  Score,
});
const mapDispatchToProps = {
  actionRequest: handleAsyncQuestion,
  actionScore: addScore,
  correctAnswers: assertionCauting };

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);

GameScreen.propTypes = {
  actionRequest: PropTypes.func.isRequired,
  quest: PropTypes.arrayOf().isRequired,
  actionScore: PropTypes.func.isRequired,
  correctAnswers: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  Score: PropTypes.number.isRequired,
};
