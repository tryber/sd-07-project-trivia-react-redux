import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import Timer from '../components/Timer';
import * as callAPI from '../services/callAPI';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { token } = this.props;
    const requestQuestions = await callAPI.requestQuestions(token);
    this.setState({ questions: requestQuestions.results });
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <Header />
        <Timer />
        { questions[0] ? <Question item={ questions[0] } /> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  token: propTypes.string,
}.isRequired;
