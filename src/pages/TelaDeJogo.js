import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Timer from './Timer';
import '../css/Button.css';

class TelaDeJogo extends Component {
  constructor() {
    super();
    this.state = { next: 0, response: false };

    this.handleQuestions = this.handleQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.failTime = this.failTime.bind(this);
  }

  handleQuestions() {
    const { questions } = this.props;
    const { next } = this.state;
    const randomResponses = [];
    const number = 5;

    if (questions[next].correct_answer) {
      randomResponses.push({
        answer: questions[next].correct_answer,
        dataTestid: 'correct-answer',
        className: 'correct-answer',
        randomIndex: Math.floor(Math.random() * number),
      });
    }

    if (questions[next].incorrect_answers) {
      questions[next].incorrect_answers.forEach((element, index) => {
        randomResponses.push({
          answer: element,
          dataTestid: `wrong-answer-${index}`,
          className: 'wrong-answer',
          randomIndex: Math.floor(Math.random() * number),
        });
      });
    }

    return randomResponses.sort((a, b) => b.randomIndex - a.randomIndex);
  }

  handleToggle() {
    const { response } = this.state;
    this.setState({ response: !response });
  }

  nextQuestion() {
    this.setState((state) => ({
      next: state.next + 1,
    }));
  }

  failTime() {
    this.setState({ response: true });
  }

  render() {
    const { email, name, score, questions } = this.props;
    const { next, response } = this.state;
    const hash = md5(email);

    return (
      <div>
        <header>
          <h1>Tela de Jogo</h1>
          <img
            data-testid="header-profile-picture"
            alt="User Profile"
            src={ `https://www.gravatar.com/avatar/${hash}` }
          />
          <div>
            <p data-testid="header-player-name">{name}</p>
          </div>
          <div>
            <p data-testid="header-score">{ score || '0' }</p>
          </div>
        </header>
        <div>
          <p data-testid="question-category">
            { questions.length && questions[next].category }
          </p>
          <p data-testid="question-text">
            { questions.length && questions[next].question }
          </p>
          {
            questions.length && this.handleQuestions().map((option, index) => (
              <button
                type="button"
                key={ index }
                className={ response
                && (option.className === 'correct-answer' ? 'correct'
                  : 'incorrect') }
                onClick={ () => this.handleToggle() }
                data-testid={ option.dataTestid }
                disabled={ response }
              >
                { option.answer }
              </button>))
          }
          <Timer failTime={ this.failTime } />
          <button type="button" onClick={ this.nextQuestion }> Next </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    email: state.player.gravatarEmail,
    name: state.player.name,
    score: state.player.score,
    questions: state.questions.results,
  });
}

TelaDeJogo.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(TelaDeJogo);
