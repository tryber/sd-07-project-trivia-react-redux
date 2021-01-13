import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { queryCount } from '../store/reducer/user.action';

class Queries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queries: [
        {
          category: '',
          question: '',
          correct_answer: '',
          incorrect_answers: [],
        },
      ],
    };
    this.handleState = this.handleState.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    this.handleState();
  }

  handleState() {
    const { queries } = this.props;
    this.setState({
      queries,
    });
  }

  handleButtonClick() {
    const { dispatchQueryCount } = this.props;
    dispatchQueryCount();
  }

  render() {
    const { queryCounter } = this.props;
    const { queries } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = queries[queryCounter];
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleButtonClick }
        >
          { correctAnswer}
        </button>
        { incorrectAnswers
          .map((answer, index) => (
            <button
              key={ answer }
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              { answer }
            </button>))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  queries: state.triviaReducer.results,
  queryCounter: state.userReducer.queryCount,
  isFetching: state.triviaReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQueryCount: () => dispatch(queryCount()),
});

Queries.propTypes = {
  queries: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchQueryCount: PropTypes.func.isRequired,
  queryCounter: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Queries);
