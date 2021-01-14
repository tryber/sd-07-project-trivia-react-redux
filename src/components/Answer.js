import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestionAnswers } from '../actions';

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
    this.setState((previous) =>({
      count: previous.count + 1,
    }));
  }

  render() {
    const { count } = this.state;
    const { resAnswer } = this.props;
    console.log(resAnswer);

    const answers = Object.values(resAnswer).map(
      ({ incorrect_answers, correct_answer }) => [
        ...incorrect_answers, correct_answer].sort()
    );

    console.log(answers[count]);
    return (
      <div>
        {[answers[count]].map((answer, index) => (
          <div key={ index }>
            <br />
            <button type="button">{ answer }</button>
            <br />
          </div>
        ))}
        <button type="button" onClick={ this.test }>teste</button>
      </div>
    );
  }
}

Answer.propTypes = {
  resAnswer: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  fetchAnswers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  resAnswer: state.question.responses,
});

const mapDispatchToProps = (dispacht) => ({
  fetchAnswers: () => dispacht(fetchQuestionAnswers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
