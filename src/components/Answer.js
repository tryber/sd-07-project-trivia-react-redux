import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  fetchQuestionAnswers,
  resQuestionAction,
  resCategoryAction,
  updateScore,
  resetTimeAction,
  stopTimeAction,
} from '../actions';
import NextButton from './NextButton';
import './Answer.css';

let countWrong = 0;
function createDataTestId([answer, isCorrect]) {
  if (isCorrect === 'wrong') {
    const testId = `wrong-answer-${countWrong}`;
    countWrong += 1;
    return [answer, testId, 'wrong'];
  }
  return [answer, 'correct-answer', 'correct'];
}

class Answer extends React.Component {
  constructor(props) {
    super(props);
    const { timeValue } = this.props;
    this.state = {
      count: 0,
      showAnswer: false,
      time: timeValue,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.respond = this.respond.bind(this);
    this.sumPoints = this.sumPoints.bind(this);
  }

  componentDidMount() {
    const { fetchAnswers, tok } = this.props;
    fetchAnswers(tok);
  }

  nextQuestion() {
    const { resetTime } = this.props;
    this.setState((previous) => ({
      count: previous.count + 1,
      showAnswer: false,
    }));
    resetTime();
  }

  async sumPoints() {
    const { update } = this.props;

    const { resAnswer, timeValue } = this.props;
    const { count, time } = this.state;
    const tres = 3;
    const dez = 10;

    const difficultys = Object.values(resAnswer).map(({ difficulty }) => difficulty);

    console.log(difficultys[count]);
    console.log(time);

    if (difficultys[count] === 'easy') return update(dez + (timeValue * 1));

    if (difficultys[count] === 'medium') return update(dez + (timeValue * 2));

    if (difficultys[count] === 'hard') return update(dez + (timeValue * tres));
  }

  respond({ target: { name } }) {
    const { stopTime } = this.props;
    this.setState({ showAnswer: true });
    if (name === 'correct') {
      this.sumPoints();
    }
    stopTime();
  }

  render() {
    const { count, showAnswer } = this.state;
    const { resAnswer, resQuest, resCategory, endTime } = this.props;
    const four = 4;

    const categorys = Object.values(resAnswer).map(({ category: cat }) => cat);

    resCategory(categorys[count]);

    const questions = Object.values(resAnswer).map(({ question: quest }) => quest);

    resQuest(questions[count]);

    const answersResponse = Object.values(resAnswer)
      .map(({
        incorrect_answers: incorrect, correct_answer: correct }) => [
        ...incorrect.map((answer) => [answer, 'wrong']), [correct, 'correct']]
        .sort());

    countWrong = 0;
    const answers = Object.values({ ...answersResponse[count] })
      .map(createDataTestId);

    return (
      <div>
        { count > four ? <Redirect to="/score" /> : '' }
        {answers.map(([answer, testId, answerClass], index) => (
          <div key={ index }>
            <br />
            <button
              className={ showAnswer ? answerClass : '' }
              type="button"
              name={ answerClass }
              data-testid={ testId }
              onClick={ this.respond }
              disabled={ showAnswer || !endTime }
            >
              { answer }
            </button>
            <br />
          </div>

        ))}
        {' '}
        <NextButton
          className={ (!endTime || showAnswer) ? 'visible' : 'hidden' }
          onclick={ () => this.nextQuestion() }
        />
      </div>
    );
  }
}

Answer.propTypes = {
  resAnswer: PropTypes.shape({}).isRequired,
  fetchAnswers: PropTypes.func.isRequired,
  resQuest: PropTypes.func.isRequired,
  resCategory: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  endTime: PropTypes.bool.isRequired,
  stopTime: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired,
  tok: PropTypes.string.isRequired,
  timeValue: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  resAnswer: state.question.responses,
  endTime: state.question.timeEnd,
  tok: state.player.token,
  timeValue: state.question.valueTime,

});

const mapDispatchToProps = (dispatch) => ({
  fetchAnswers: (token) => dispatch(fetchQuestionAnswers(token)),
  resQuest: (quest) => dispatch(resQuestionAction(quest)),
  resCategory: (cat) => dispatch(resCategoryAction(cat)),
  update: (points) => dispatch(updateScore(points)),
  resetTime: () => dispatch(resetTimeAction()),
  stopTime: () => dispatch(stopTimeAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
