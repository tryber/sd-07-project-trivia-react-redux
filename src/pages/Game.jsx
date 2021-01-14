import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import Timer from '../components/Timer';
import { getQuestions, nextQuestion } from '../actions';

class Game extends Component {
  constructor() {
    super();

    this.state = { redirect: false };

    this.getQuestions = this.getQuestions.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { requestQuestions, token } = this.props;
    requestQuestions(token);
  }

  nextQuestion() {
    const { changeQuestions, questions } = this.props;
    const filteredQuestions = questions.filter((item) => item !== questions[0]);
    if (filteredQuestions.length === 0) {
      return this.setState({ redirect: true });
    }
    changeQuestions(filteredQuestions);
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
    const { redirect } = this.state;
    const { questions, clicked } = this.props;
    console.log(questions);
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
  changeQuestions: (array) => dispatch(nextQuestion(array)),
  requestQuestions: (string) => dispatch(getQuestions(string)),
});

const mapStateToProps = (state) => ({
  token: state.player.token,
  clicked: state.questions.clicked,
  questions: state.questions.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  token: propTypes.string,
}.isRequired;
