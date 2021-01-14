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
    this.renderButton = this.renderButton.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { token } = this.props;
    const requestQuestions = await callAPI.requestQuestions(token);
    this.setState({ questions: requestQuestions.results });
  }

  renderButton() {
    return (
      <button type="button" data-testid="btn-next">Próxima pergunta</button>
    );
  }

  render() {
    const { questions } = this.state;
    const { clicked } = this.props;
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

const mapStateToProps = (state) => ({
  token: state.player.token,
  clicked: state.color.clicked,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  token: propTypes.string,
}.isRequired;
