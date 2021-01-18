import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Question from '../Question';
import NextButton from '../NextButton';

import './questionList.css';
import { gameActions } from '../../actions';

class QuestionsList extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      score: 0,
      assertions: 0,
      question: 0,
    };

    this.calculateScore = this.calculateScore.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidUpdate() {
    const { count } = this.props;
    if (count === 0) this.stoppingTime();
  }

  componentWillUnmount() {
    const { name, email } = this.props;
    const { score } = this.state;

    const rank = JSON.parse(localStorage.getItem('ranking'));
    const newRank = [{ name, score, picture: `https://www.gravatar.com/avatar/${md5(email)}` }];
    if (rank) {
      const newRankCopy = [...rank, ...newRank];
      return localStorage.setItem('ranking', JSON.stringify(newRankCopy));
    }
    return localStorage.setItem('ranking', JSON.stringify(newRank));
  }

  stoppingTime() {
    const { stopTimer } = this.props;
    stopTimer();
    this.setState({ clicked: true });
  }

  handleClick(e) {
    const { id } = e.target;
    this.stoppingTime();
    if (id === 'correct') this.calculateScore();
  }

  calculateScore() {
    const { list, count } = this.props;
    const { score, assertions } = this.state;
    const { difficulty } = list[0];
    const baseScore = 10;
    const multPerDifficulty = { easy: 1, medium: 2, hard: 3 };

    const newScore = score + baseScore + (count * multPerDifficulty[difficulty]);
    const newAssertions = assertions + 1;

    this.saveLocalData(newScore, newAssertions);
  }

  saveLocalData(score, assertions) {
    const { upScore, name, email: gravatarEmail } = this.props;
    const plyrObjct = { player: { assertions, score, name, gravatarEmail } };

    upScore(score);
    localStorage.setItem('state', JSON.stringify(plyrObjct));
    this.setState({ score, assertions });
  }

  nextQuestion() {
    const { resetTimer } = this.props;

    resetTimer();
    this.setState((prev) => ({ question: prev.question + 1, clicked: false }));
  }

  render() {
    const { list, count } = this.props;
    const { clicked, question } = this.state;
    const maxQuestions = 4;

    if (!list[0]) return <h1>...Carregando</h1>;
    if (question > maxQuestions) return <Redirect to="/feedback" />;

    return (
      <div>
        <Question
          listObjct={ list[question] }
          clicked={ clicked }
          count={ count }
          handleClick={ this.handleClick }
        />
        { clicked && <NextButton nextQuestion={ this.nextQuestion } />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  list: state.game.QuestionsList,
});

const mapDispatchToProps = (dispatch) => ({
  upScore: (score) => dispatch(gameActions.updateScore(score)),
});

QuestionsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  upScore: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
