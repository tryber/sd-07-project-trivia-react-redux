import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import Timer from '../components/Timer';
import NextQuestionButton from '../components/NextQuestionButton';
import { getQuestions } from '../actions';

class Game extends Component {
  constructor() {
    super();

    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { requestQuestions, token } = this.props;
    requestQuestions(token);
  }

  render() {
    const { redirect, questions } = this.props;
    if (redirect) return (<Redirect to="/feedback" />);
    return (
      <div>
        <Header />
        <Timer />
        { questions[0] ? <Question item={ questions[0] } /> : null }
        <NextQuestionButton />
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (string) => dispatch(getQuestions(string)),
});

const mapStateToProps = (state) => ({
  token: state.player.token,
  questions: state.questions.questions,
  redirect: state.questions.redirectToFeedback,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  token: propTypes.string,
}.isRequired;
