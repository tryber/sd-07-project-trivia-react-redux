import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchQuestions from '../services/questionsApi';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.fetchGravatar = this.fetchGravatar.bind(this);
    this.state = {
      urlImg: '',
      placar: 0,
      questions: { results: [] },
      position: 0,
      counter: 30,
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.requestQuestions = this.requestQuestions.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    const cinco = 5;
    const second = 1000;
    const { tokenValue } = this.props;
    const { counter } = this.state;
    this.fetchGravatar();
    this.requestQuestions(cinco, tokenValue);
    if (counter !== 0) {
      setTimeout(() => {
        this.countDown();
      }, second);
    }
  }

  async requestQuestions(number, token) {
    this.setState({
      questions: await fetchQuestions(number, token),
    });
    console.log('funcaçao');
  }

  fetchGravatar() {
    const { emailSave } = this.props;
    const hash = md5(emailSave);
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      urlImg: url,
    });
  }

  clickHandler() {
    const { position } = this.state;
    this.setState({
      position: position + 1,
    });
  }

  countDown() {
    this.setState((prevState) => ({ counter: prevState.counter - 1 }));
    console.log(this.state.counter)
  }

  render() {
    const { emailSave, nameSave } = this.props;
    const { urlImg, placar, questions, position } = this.state;
    const { results } = questions;

    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">{nameSave}</h1>

          <h2>{emailSave}</h2>
          <h2 data-testid="header-score">{placar}</h2>
          <img data-testid="header-profile-picture" src={ urlImg } alt="Gravatar" />

        </header>
        <h1 data-testid="settings-title">Trivia!</h1>
        <section>
          {results.map((item, index1) => {
            const quatro = 4;
            const answers = item.incorrect_answers.map((answer, index) => (
              <button
                onClick={ this.clickHandler }
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {' '}
                {answer}
                {' '}
              </button>
            ));
            const answerCorrect = (
              <button
                onClick={ this.clickHandler }
                type="button"
                data-testid="correct-answer"
              >
                {' '}
                {item.correct_answer}
                {' '}
              </button>
            );
            answers.splice(Math.floor(Math.random() * quatro), 0, answerCorrect);
            return (
              <div key={ index1 }>
                <p data-testid="question-category">
                  Categoria:
                  {item.category}
                </p>
                <p data-testid="question-text">
                  Questão :
                  {item.question}
                </p>
                <ul>
                  {answers.map((item1, index2) => <li key={ index2 }>{item1}</li>)}
                </ul>
              </div>
            );
          })[position]}
        </section>
      </div>
    );
  }
}

Trivia.propTypes = {
  emailSave: PropTypes.string.isRequired,
  nameSave: PropTypes.string.isRequired,
  tokenValue: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailSave: state.infoPlayer.emailPlayer,
  nameSave: state.infoPlayer.namePlayer,
  tokenValue: state.token.token,
});

export default connect(mapStateToProps)(Trivia);
