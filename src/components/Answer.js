import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchQuestionAnswers,
  resQuestionAction,
  resCategoryAction,
  updateScore,
} from '../actions';
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
    this.state = {
      count: 0,
      showAnswer: false,
    };
    this.test = this.test.bind(this);
    this.respond = this.respond.bind(this);
  }

  componentDidMount() {
    const { fetchAnswers } = this.props;
    fetchAnswers();
  }

  test() {
    this.setState((previous) => ({
      count: previous.count + 1,
      showAnswer: false,
    }));
  }

  respond({ target: { name } }) {
    const { update } = this.props;
    this.setState({ showAnswer: true });
    if (name === 'correct') {
      update(100);
    }
  }

  render() {
    const { count, showAnswer } = this.state;
    const { resAnswer, resQuest, resCategory } = this.props;

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
        {answers.map(([answer, testId, answerClass], index) => (
          <div key={ index }>
            <br />
            <button
              className={ showAnswer ? answerClass : '' }
              type="button"
              name={ answerClass }
              data-testid={ testId }
              onClick={ this.respond }
            >
              { answer }
            </button>
            <br />
          </div>
        ))}
        <br />
        <button type="button" onClick={ this.test }>Próxima</button>
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
};

const mapStateToProps = (state) => ({
  resAnswer: state.question.responses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAnswers: () => dispatch(fetchQuestionAnswers()),
  resQuest: (quest) => dispatch(resQuestionAction(quest)),
  resCategory: (cat) => dispatch(resCategoryAction(cat)),
  update: (points) => dispatch(updateScore(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
