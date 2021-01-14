import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestionAnswers, resQuestion } from '../actions';

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
    const { resAnswer, resQuest } = this.props;

    const questions = Object.values(resAnswer).map(({ question: quest }) => quest);

    resQuest(questions[count]);

    const answersResponse = Object.values(resAnswer)
      .map(({
        incorrect_answers: incorrect, correct_answer: correct }) => [
        ...incorrect, correct].sort());

    const answers = { ...answersResponse[count] };

    return (
      <div>
        {Object.values(answers).map((answer, index) => (
          <div key={ index }>
            <br />
            <button type="button">{ answer }</button>
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
};

const mapStateToProps = (state) => ({
  resAnswer: state.question.responses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAnswers: () => dispatch(fetchQuestionAnswers()),
  resQuest: (quest) => dispatch(resQuestion(quest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
