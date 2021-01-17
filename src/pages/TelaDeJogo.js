import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5'

class TelaDeJogo extends Component {
  constructor() {
    super();
    this.state = { 
      next: 0 ,
      buttonNext: false,
      timer: 30,
      onDesable: false,
    };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showBtnNext = this.showBtnNext.bind(this);
  }

componentDidMount() {
  this.countdonw()
}
componentWillUnmount() {
  const { interval } = this.state;
  clearInterval(interval);
}
  countdonw = () => {
    const second = 1000;
    const interval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState({timer: timer -1})
      } else {
        clearInterval(interval);
      }
    }, second);
    this.setState(
      { interval },
    );
  }

  showBtnNext() {
    const { buttonNext } = this.state;
    if (buttonNext) {
      return (<button type="button" data-testid="btn-next" onClick={() => {this.nextQuestion()} }> Próxima </button>)
    }
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
    randomResponses.sort((a, b) => a.randomIndex - b.randomIndex);
    return randomResponses;
  }

  nextQuestion() {
    const {next, interval} = this.state;
    clearInterval(interval);
    this.setState({ next: next + 1, buttonNext: false, timer: 30});
    this.countdonw();
  }

  render() {
    const { email, name, score, questions } = this.props;
    const { next, timer } = this.state;
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
          <h2>{timer}</h2>
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
                onClick={() => this.setState({buttonNext: true})}
              >
                { option.answer }
              </button>))
          }
          {this.showBtnNext()}
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
