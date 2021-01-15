import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addScore } from '../Redux/Actions';
import ButtonAnswer from '../components/ButtonAnswer';

import './Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super();
    this.state = {
      questions: props.questions,
      index: 0,
      status: true,
      score: 0,
      assertions: 0,
      showAnswers: false,
      seconds: 30,
      answers: [],
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.clickRightAnswer = this.clickRightAnswer.bind(this);
    this.clickButtonAnswer = this.clickButtonAnswer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {
    this.setTimer();
    this.shuffle();
  }

  setTimer() {
    const oneSecond = 1000;
    const myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds: prevSeconds }) => ({
          seconds: prevSeconds - 1,
        }));
      }
      if (seconds === 0) {
        clearInterval(myInterval);
        this.setState({
          status: false,
        });
      }
    }, oneSecond);
  }

  nextQuestion() {
    const { index } = this.state;
    const limit = 4;
    if (index < limit) {
      this.setState({
        index: index + 1,
        seconds: 30,
        status: true,
        showAnswers: false,
      }, () => this.shuffle());
    } else {
      const { push } = this.props;
      push('/feedback');
    }
    this.setTimer();
  }

  clickRightAnswer() {
    const { addScoreAction } = this.props;
    const { score, questions, index, seconds, assertions } = this.state;
    const hard = 3;
    const medium = 2;
    let difficulty = 0;
    if (questions[index].difficulty === 'hard') {
      difficulty = hard;
    } else if (questions[index].difficulty === 'medium') {
      difficulty = medium;
    } else {
      difficulty = 1;
    }
    const multiplePoints = 10;
    const finalCount = multiplePoints + (seconds * difficulty) + score;
    addScoreAction(finalCount);

    this.setState({
      score: finalCount,
      assertions: assertions + 1,
    });

    const storage = JSON.parse(localStorage.getItem('state'));
    storage.player.score = finalCount;
    storage.player.assertions = assertions + 1;
    localStorage.setItem('state', JSON.stringify(storage));
    this.clickButtonAnswer();
  }

  clickButtonAnswer() {
    this.setState({
      status: false,
      showAnswers: true,
      seconds: 0,
    });
  }

  shuffle() {
    const { index, questions } = this.state;
    const {
      correct_answer: correctAnswer, incorrect_answers: incorrectAnswer,
    } = questions[index];
    const shuffleNumber = 0.5;
    const shuffleAnswers = [...incorrectAnswer, correctAnswer]
      .sort(() => shuffleNumber - Math.random());

    this.setState({ answers: shuffleAnswers });
  }

  render() {
    const {
      questions, index, status, showAnswers, seconds, answers,
    } = this.state;
    return (
      <div>
        <h3>
          Question
        </h3>
        <div id="bloco-pergunta">
          <div id="categoria-pergunta">
            Category:
            <span
              data-testid="question-category"
            >
              {questions[index].category}
            </span>
          </div>
        </div>
        <span data-testid="question-text">
          {questions[index].question}
        </span>
        <div id="bloco-respostas">
          {answers
            .map((item, itemIndex) => (
              <ButtonAnswer
                onClick={ questions[index].correct_answer === item
                  ? this.clickRightAnswer
                  : this.clickButtonAnswer }
                disabled={ (seconds === 0 || !status) }
                type="button"
                key={ itemIndex }
                dataTestid={ questions[index].correct_answer === item
                  ? 'correct-answer'
                  : 'wrong-answer' }
                className={ questions[index].correct_answer === item
                  ? 'correct'
                  : 'incorrect' }
                item={ item }
                showAnswers={ showAnswers }
              />))}
        </div>
        <button
          className={ status ? 'unvisible' : '' }
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Next
        </button>
        <span>
          Tempo restante:
          {seconds}
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addScoreAction: (score) => dispatch(addScore(score)),
});

export default connect(null, mapDispatchToProps)(Questions);

Questions.propTypes = {
  addScoreAction: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  push: PropTypes.func.isRequired,
};
