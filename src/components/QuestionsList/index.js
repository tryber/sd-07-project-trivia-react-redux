import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../Question';

import './questionList.css';
import { gameActions } from '../../actions';

class QuestionsList extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      score: 0,
      assertions: 0,
    };

    this.calculateScore = this.calculateScore.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    const { count } = this.props;
    if (count === 0) this.stoppingTime();
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

  render() {
    const { list, count } = this.props;
    const { clicked } = this.state;

    if (!list[0]) return <h1>...Carregando</h1>;

    return (
      <div>
        <Question
          listObjct={ list[0] }
          clicked={ clicked }
          count={ count }
          handleClick={ this.handleClick }
        />
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
  list: PropTypes.shape(PropTypes.array).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  upScore: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
