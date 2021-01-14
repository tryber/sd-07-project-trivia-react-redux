import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import Timer from '../components/Timer';
import * as callAPI from '../services/callAPI';
import { nextQuestion } from '../actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      redirect: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { token } = this.props;
    const requestQuestions = await callAPI.requestQuestions(token);
    this.setState({ questions: requestQuestions.results });
  }

  nextQuestion() {
    const { questions } = this.state;
    const { changeQuestion } = this.props;
    const filteredQuestions = questions.filter((item) => item !== questions[0]);
    if (filteredQuestions.length === 0) {
      return this.setState({ redirect: true });
    }
    this.setState({ questions: filteredQuestions });
    changeQuestion();
  }

  renderButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Próxima pergunta
      </button>
    );
  }

  render() {
    const { questions, redirect } = this.state;
    const { clicked } = this.props;
    if (redirect) return (<Redirect to="/feedback" />);
    return (
      <div>
        <Header />
        <Timer />
        { questions[0] ? <Question item={ questions[0] } /> : null }
        { clicked ? this.renderButton() : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: () => dispatch(nextQuestion()) });

const mapStateToProps = (state) => ({
  token: state.player.token,
  clicked: state.color.clicked,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  token: propTypes.string,
}.isRequired;
