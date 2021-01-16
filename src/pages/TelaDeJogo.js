import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class TelaDeJogo extends Component {
  constructor() {
    super();
    this.state = { next: 0 };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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
        randomIndex: Math.floor(Math.random() * number),
      });
    }

    if (questions[next].incorrect_answers) {
      questions[next].incorrect_answers.forEach((element, index) => {
        randomResponses.push({
          answer: element,
          dataTestid: `wrong-answer-${index}`,
          randomIndex: Math.floor(Math.random() * index),
        });
      });
    }

    return randomResponses.sort((a, b) => a.randomIndex - b.randomIndex);
  }

  nextQuestion() {
    this.setState((state) => ({
      next: state.next + 1,
    }));
  }

  render() {
    const { email, name, score, questions } = this.props;
    const { next } = this.state;
    const hash = md5(email);
    console.log(name);
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
            questions.length && this.handleQuestions().map((option, i) => (
              <button
                type="button"
                key={ i }
                data-testid={ option.dataTestid }
              >
                { option.answer }
              </button>))
          }
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
