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
    const { requestQuestions, token, category, difficulty, type } = this.props;
    requestQuestions({ token, category, difficulty, type });
  }

  render() {
    const { redirect, questions } = this.props;
    if (redirect) return (<Redirect to="/feedback" />);
    return (
      <div>
        <Header />
        <Timer />
        { questions[0] ? <Question item={ questions[0] } /> : null }
        <br />
        <NextQuestionButton />
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (object) => dispatch(getQuestions(object)),
});

const mapStateToProps = (state) => ({
  token: state.player.token,
  category: state.questions.category,
  difficulty: state.questions.difficulty,
  type: state.questions.type,
  questions: state.questions.questions,
  redirect: state.questions.redirectToFeedback,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  token: propTypes.string,
  category: propTypes.string,
  difficulty: propTypes.string,
  type: propTypes.string,
}.isRequired;
