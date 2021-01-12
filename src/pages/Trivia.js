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
      replyConfirmation: false,
      clicked: false,
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.requestQuestions = this.requestQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const cinco = 5;
    const { tokenValue } = this.props;
    this.fetchGravatar();
    this.requestQuestions(cinco, tokenValue);
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
    this.setState({
      replyConfirmation: true,
      clicked: true,
    });
  }

  nextQuestion() {
    const { position } = this.state;
    this.setState({
      position: position + 1,
      replyConfirmation: false,
    });
  }

  render() {
    const { emailSave, nameSave } = this.props;
    const {
      urlImg,
      placar,
      questions,
      position,
      replyConfirmation,
      clicked } = this.state;
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
                onClick={ ({ target }) => this.clickHandler(target) }
                key={ index }
                type="button"
                className={ clicked ? 'wrongRed' : '' }
                data-testid={ `wrong-answer-${index}` }
              >
                {' '}
                {answer}
                {' '}
              </button>
            ));
            const answerCorrect = (
              <button
                onClick={ ({ target }) => this.clickHandler(target) }
                id="rightAnswer"
                type="button"
                className={ clicked ? 'rightGreen' : '' }
                data-testid="correct-answer"
              >
                { ' '}
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
          <button
            data-testid="btn-next"
            hidden={ replyConfirmation ? '' : 'hidden' }
            onClick={ this.nextQuestion }
            type="button"
          >
            Próxima
          </button>
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
