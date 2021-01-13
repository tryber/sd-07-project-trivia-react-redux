import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';

class Play extends Component {
  constructor(props) {
    super(props);
    this.getQuestions = this.getQuestions.bind(this);
    this.setQuestions = this.setQuestions.bind(this);
    this.state = {
      currentLevel: 0,
      questionsData: [],
      category: '',
      questionText: '',
      currentAnswers: [],
      correctAnswer: '',
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate(previous) {
    const { game } = this.props;
    if (previous.game !== game) {
      const { questions } = game;
      const { currentLevel } = this.state;
      const newState = {
        category: questions[currentLevel].category,
        questionText: questions[currentLevel].question,
        currentAnswers:
          [questions[currentLevel].correct_answer,
            ...questions[currentLevel].incorrect_answers],
      };
      this.setQuestions(newState);
    }
  }

  setQuestions(state) {
    this.setState(state);
  }

  async getQuestions() {
    const { apiFetchQuestions } = this.props;
    await apiFetchQuestions();
    const { game } = this.props;
    const { questions } = game;
    this.setState({ questionsData: questions });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    const { category, questionText } = this.state;
    const { currentAnswers } = this.state;
    return (
      <div>
        <h1>Play</h1>
        <p>{category}</p>
        <p>{questionText}</p>
        { currentAnswers.map((answer) => (
          <button
            key={ answer }
            type="button"
          >
            {answer}
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  apiFetchQuestions: () => dispatch(fetchQuestions()),
});

Play.propTypes = {
  apiFetchQuestions: PropTypes.func.isRequired,
  game: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
