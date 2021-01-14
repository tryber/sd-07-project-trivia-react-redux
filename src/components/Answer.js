import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestionAnswers, resQuestionAction, resCategoryAction } from '../actions';

let countWrong = 0;
function createDataTestId([answer, isCorrect]) {
  if (isCorrect === 'wrong') {
    const testId = `wrong-answer-${countWrong}`;
    countWrong += 1;
    return [answer, testId];
  }
  return [answer, 'correct-answer'];
}

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.test = this.test.bind(this);
  }

  componentDidMount() {
    const { fetchAnswers } = this.props;
    fetchAnswers();
  }

  test() {
    this.setState((previous) => ({
      count: previous.count + 1,
    }));
  }

  render() {
    const { count } = this.state;
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
    console.log(answers);

    return (
      <div>
        {answers.map(([answer, testId], index) => (
          <div key={ index }>
            <br />
            <button type="button" data-testid={ testId }>{ answer }</button>
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
};

const mapStateToProps = (state) => ({
  resAnswer: state.question.responses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAnswers: () => dispatch(fetchQuestionAnswers()),
  resQuest: (quest) => dispatch(resQuestionAction(quest)),
  resCategory: (cat) => dispatch(resCategoryAction(cat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
