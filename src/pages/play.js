import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import './question.css';

class Play extends Component {
  constructor() {
    super();
    this.state = {
      trivia: [],
      isLoading: false,
      disabled: false,
      timer: 30,
      index: 0,
      answered: false,
      btclass: 'answer',
      btclassw: 'answer',
      btnext: 'btnexthi',
    };
    this.triviaApi = this.triviaApi.bind(this);
    this.counter = this.counter.bind(this);
    this.next = this.next.bind(this);
    this.chosen = this.chosen.bind(this);
  }

  componentDidMount() {
    this.triviaApi();
    this.counter();
  }

  next() {
    const four = 4;
    const { index, btclass, btclassw, btnext } = this.state;
    if (index < four) {
      this.setState(({ index: index + 1 }));
      this.setState({ timer: 30 });
      this.setState({ disabled: false });
      this.setState({
        btclass: 'answer',
        btclassw: 'answer',
        btnext: 'btnexthi',
      });
    } else {
      this.setState({
        btclass: 'answer',
        btclassw: 'answer',
        btnext: 'btnexthi',
      });
      console.log(btclass, btclassw, btnext);
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  counter() {
    const magicNumber = 1000;
    setInterval(() => {
      const { timer, btnext } = this.state;
      console.log(btnext);
      if (timer > 0) {
        this.setState(({ timer: timer - 1 }));
      }
      if (timer <= 0) {
        this.setState({
          disabled: true,
          btnext: 'answer',
        });
      }
    }, magicNumber);
  }

  chosen({ target }) {
    const { trivia, index, answered, disabled, btclass, btclassw, btnext } = this.state;
    const answer = target.value;
    console.log(answered, disabled, btclass, btclassw, btnext);
    this.setState({
      answered: true,
      disabled: true,
      btclass: 'correct',
      btclassw: 'incorrect',
      btnext: 'answer',
    });
    if (answer === trivia[index].correct_answer) console.log('foi');
  }

  trivia() {
    const { trivia, disabled, timer, index, btclass, btclassw, btnext } = this.state;
    return (
      <div>
        <div>
          <p>{timer}</p>
          <p data-testid="question-category">{trivia[index].category}</p>
          <p data-testid="question-text">{trivia[index].question}</p>
          <button
            type="button"
            data-testid="correct-answer"
            disabled={ disabled }
            onClick={ this.chosen }
            className={ btclass }
            value={ trivia[index].correct_answer }
          >
            {trivia[index].correct_answer}
          </button>
          {trivia[index].incorrect_answers.map((incorrect, index2) => (
            <div key={ index2 }>
              <button
                type="button"
                disabled={ disabled }
                onClick={ this.chosen }
                className={ btclassw }
                value={ incorrect[index2] }
                data-testid={ `wrong-answer-${index2}` }
              >
                {incorrect}
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.next }
          className={ btnext }
        >
          Próxima
        </button>
      </div>);
  }

  hash() {
    const { email } = this.props;
    const url = `https://www.gravatar.com/avatar/${md5(email)}`;
    return url;
  }

  triviaApi() {
    const { token } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    fetch(url).then((response) => response.json())
      .then((json) => { this.setState({ trivia: json.results, isLoading: true }); });
  }

  render() {
    const { name, score = 0 } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <header>
          <img src={ this.hash() } alt="avatar" data-testid="header-profile-picture" />
          <h1 data-testid="header-player-name">{name}</h1>
          <p data-testid="header-score">{score}</p>
        </header>
        { isLoading ? this.trivia() : <p>Carregando</p> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  email: state.login.email,
  name: state.player.name,
  score: state.player.score,
});

Play.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Play);
