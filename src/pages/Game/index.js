import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Timer,
  Answer,
  ConfigButton,
  Next,
  Title,
  // QuestionCategory,
} from '../../components';
import { getStorage, setStorage } from '../../services';
import getApi from '../../services/api';
import './style.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isFetching: true,
      turn: 0,
      timer: 30,
      next: false,
      visibility: 'circle-visibility',
      intervalID: 0,
      finishTime: '',
      questionAnsered: false,
    };
    this.handleApiRequisition = this.handleApiRequisition.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
  }

  componentDidMount() {
    this.handleApiRequisition();
  }

  changeTimer() {
    const interval = 1000;
    const ID = setInterval(() => {
      this.setState((oldState) => ({ timer: oldState.timer - 1 }));
    }, interval);

    return ID;
  }

  clearTimer(ID) {
    const timeOut = 30000;
    setTimeout(() => {
      const { timer } = this.state;
      // const curQuestion = questions[turn];
      // let index = 1;
      // if (curQuestion.correct_answer === 1) index += 1;

      // this.handleClickAnswer(index);
      // const { intervalID } = this.state;
      // clearInterval(intervalID);
      // this.setState({
      //   visibility: '',
      //   next: true,
      //   questionAnsered: true,
      // timer: 30,
      // });

      clearInterval(ID);
      this.setState({
        next: true,
        visibility: '',
        questionAnsered: true,
      });
      if (!timer) this.setState({ finishTime: 'wrong' });
    }, timeOut);
  }

  async handleApiRequisition() {
    const token = await getStorage('token');
    const config = await getStorage('config');
    const questionUrl = `${config.url}${token}`;
    const apiQuestionresult = await getApi(questionUrl);
    const { results } = apiQuestionresult;
    this.setState({ questions: results });

    const ID = this.changeTimer();
    this.clearTimer(ID);
    this.setState({
      isFetching: false,
      intervalID: ID,
    });
  }

  contentHeader(currQuestion, timer) {
    const { question, category } = currQuestion;
    return (
      <div className="game-content-child game-header">
        <div className="game-flex-basis-corners" />
        <div className="game-flex-basis-center">
          <Title
            title={ question }
            dataTestid="question-text"
            subTitle2={ category }
            dataTestid2="question-category"
          />
        </div>
        <div className="game-flex-basis-corners">
          <Timer timer={ timer } />
        </div>
      </div>
    );
  }

  handleCurrentScore() {
    const { timer, questions, turn } = this.state;
    const questionsDifficulty = ['nonUsed', 'easy', 'medium', 'hard'];
    const pointsCalcPattern = 10;
    return (
      pointsCalcPattern + (
        timer * questionsDifficulty.indexOf(questions[turn].difficulty)
      )
    );
  }
  // state.player.score += this.handleCurrentScore();

  handleClickAnswer(index) {
    const { questions, turn } = this.state;
    const curQuestion = questions[turn];
    const answers = [...curQuestion.incorrect_answers, curQuestion.correct_answer];

    if (answers[index] === curQuestion.correct_answer) {
      console.log('clicou');
      const state = getStorage('state');
      state.player.assertions += 1;

      // const { score } = state.player;
      state.player.score += this.handleCurrentScore();

      setStorage('state', state);
    }
    // console.log('errrouu');

    const { intervalID } = this.state;
    clearInterval(intervalID);
    this.setState({
      visibility: '',
      next: true,
      questionAnsered: true,
      timer: 30,
    });
  }

  contentButtons(curQuestion) {
    const { finishTime, newQuestion, questionAnsered } = this.state;
    return (
      <div className="game-content-child game-main">
        <div className="game-flex-basis-corners" />
        <div className="game-flex-basis-center">
          <Answer
            curQuestion={ curQuestion }
            click={ this.handleClickAnswer }
            borderWrong={ finishTime }
            newQuestion={ newQuestion }
            questionAnsered={ questionAnsered }
          />
        </div>
        <div className="game-flex-basis-corners" />
      </div>
    );
  }

  handleClickNext() {
    const { next, turn, questions } = this.state;
    if (turn + 1 < questions.length) {
      if (next) {
        this.setState((prevState) => ({
          turn: prevState.turn + 1,
          timer: 30,
          next: false,
          visibility: 'circle-visibility',
          finishTime: '',
          newQuestion: true,
          questionAnsered: false,
        }));
        const ID = this.changeTimer();
        this.clearTimer(ID);
        this.setState({
          intervalID: ID,
        });
      }
    } else {
      const ranking = getStorage('ranking');
      const state = getStorage('state');
      ranking[ranking.length - 1].score = state.player.score;
      setStorage('ranking', ranking);

      const { history } = this.props;
      history.push('/feedback');
    }
  }

  contentFooter() {
    const { visibility } = this.state;
    return (
      <div className="game-content-child game-footer">
        <div className="game-flex-basis-corners">
          <ConfigButton />
        </div>
        <div className="game-flex-basis-center">
          <Next
            dataTestid="btn-next"
            onClick={ this.handleClickNext }
            visibility={ visibility }
          />
        </div>
        <div className="game-flex-basis-corners" />
      </div>
    );
  }

  render() {
    const { questions, isFetching, turn } = this.state;
    const curQuestion = questions[turn];

    if (isFetching) {
      return (<h1>Loading</h1>);
    }
    const { timer } = this.state;
    return (
      <div className="game-container">
        <Header />
        {/* <QuestionCategory /> */}
        <div className="game-content">
          {this.contentHeader(curQuestion, timer)}
          {this.contentButtons(curQuestion)}
          {this.contentFooter()}
        </div>

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Game;
