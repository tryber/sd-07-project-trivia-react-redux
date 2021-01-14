import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchQuestions from '../services/questionsApi';
import Questions from '../components/Questions';
import { counterTime } from '../redux/actions/index';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.fetchGravatar = this.fetchGravatar.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.requestQuestions = this.requestQuestions.bind(this);
    this.disable = this.disable.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.countDown = this.countDown.bind(this);
    this.state = {
      urlImg: '',
      placar: 0,
      questions: { results: [] },
      position: 0,
      disabled: false,
      replyConfirmation: false,
      clicked: false,
      counter: 30,
      acertos: 0,
    };
  }

  componentDidMount() {
    const cinco = 5;
    const { tokenValue } = this.props;
    this.fetchGravatar();
    this.requestQuestions(cinco, tokenValue);
    const second = 1000;
    this.interval = setInterval(() => {
      this.countDown();
    }, second);
    localStorage.setItem('state', JSON.stringify({
      player:
      {
        score: 0,
        name: '',
        assertions: 0,
        gravatarEmail: '',
      },
    }));
  }

  async requestQuestions(number, token) {
    this.setState({
      questions: await fetchQuestions(number, token),
    });
  }

  fetchGravatar() {
    const { emailSave } = this.props;
    const hash = md5(emailSave);
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      urlImg: url,
    });
  }

  clickHandler(target, difficulty) {
    const { counter } = this.state;
    const um = 1;
    const dois = 2;
    const tres = 3;
    const dez = 10;
    let points;
    if (difficulty === 'hard') {
      points = tres;
    } else if (difficulty === 'medium') {
      points = dois;
    } else if (difficulty === 'easy') {
      points = um;
    }
    if (target.id === 'rightAnswer') {
      this.setState((previus) => ({
        placar: dez + (points * counter) + previus.placar,
        acertos: previus.acertos + 1,
      }), () => {
        const { placar } = this.state;
        const { acertos } = this.state;
        localStorage.setItem('state',
          JSON.stringify({ player: { score: placar, assertions: acertos } }));
      });
    } else {
      const { placar } = this.state;
      const { acertos } = this.state;
      localStorage.setItem('state',
        JSON.stringify({ player: { score: placar, assertions: acertos } }));
    }
    this.setState({
      replyConfirmation: true,

      clicked: true,

    });
  }

  nextQuestion() {
    const { position } = this.state;
    const { history } = this.props;
    const maxLength = 4;
    return position === maxLength ? history.push('/feedback')
      : this.setState({
        position: position + 1,
        replyConfirmation: false,
        clicked: false,
        counter: 30,
      });
  }

  disable() {
    this.setState({ disabled: true });
  }

  countDown() {
    const { counter } = this.state;
    const { timerDispatch } = this.props;
    timerDispatch(counter);
    if (counter > 0) {
      this.setState({ counter: counter - 1 });
    } else {
      this.disable();
    }
  }

  render() {
    const { emailSave, nameSave, timer } = this.props;
    const {
      urlImg,
      placar,
      questions,
      position,
      replyConfirmation,
      clicked,
      disabled,
      counter } = this.state;
    console.log(timer);

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
          <Questions
            clicked={ clicked }
            disabled={ disabled }
            position={ position }
            questions={ questions }
            clickHandler={ this.clickHandler }
          />
          <button
            data-testid="btn-next"
            hidden={ replyConfirmation ? '' : 'hidden' }
            onClick={ this.nextQuestion }
            type="button"
          >
            Próxima
          </button>
        </section>
        <div>{counter}</div>
      </div>
    );
  }
}

Trivia.propTypes = {
  emailSave: PropTypes.string.isRequired,
  nameSave: PropTypes.string.isRequired,
  tokenValue: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  timerDispatch: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  emailSave: state.infoPlayer.emailPlayer,
  nameSave: state.infoPlayer.namePlayer,
  tokenValue: state.token.token,
  timer: state.timer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  timerDispatch: (timer) => dispatch(counterTime(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
