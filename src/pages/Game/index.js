import React, { Component } from 'react';
import {
  Header,
  Timer,
  Answer,
  ConfigButton,
  Next,
  Title,
  // QuestionCategory,
} from '../../components';
import { getStorage } from '../../services';
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
    };
    this.handleApiRequisition = this.handleApiRequisition.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
  }

  componentDidMount() {
    this.handleApiRequisition();
  }

  changeTimer() {
    const interval = 1000;
    const intervaiID = setInterval(() => {
      this.setState((oldState) => ({ timer: oldState.timer - 1 }));
    }, interval);

    return intervaiID;
  }

  clearTimer(ID) {
    const timeOut = 30000;
    setTimeout(() => {
      clearInterval(ID);
    }, timeOut);
  }

  async handleApiRequisition() {
    const token = getStorage();
    const questionUrl = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const apiQuestionresult = await getApi(questionUrl);
    const { results } = apiQuestionresult;
    this.setState({ questions: results });

    this.setState({ isFetching: false });
    const ID = this.changeTimer();
    this.clearTimer(ID);
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

  contentButtons(curQuestion) {
    return (
      <div className="game-content-child game-main">
        <div className="game-flex-basis-corners" />
        <div className="game-flex-basis-center">
          <Answer curQuestion={ curQuestion } />
        </div>
        <div className="game-flex-basis-corners" />
      </div>
    );
  }

  contentFooter() {
    return (
      <div className="game-content-child game-footer">
        <div className="game-flex-basis-corners">
          <ConfigButton />
        </div>
        <div className="game-flex-basis-center">
          <Next dataTestid="btn-next" />
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

export default Game;
