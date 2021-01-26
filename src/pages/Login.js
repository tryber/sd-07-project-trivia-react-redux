import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail, getName } from '../actions';
import '../css/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      token: '',
    };

    this.requestToken = this.requestToken.bind(this);
    this.createLocalState = this.createLocalState.bind(this);
    this.readLocalRanking = this.readLocalRanking.bind(this);
    this.createLocalRanking = this.createLocalRanking.bind(this);
    this.createLocalStorage = this.createLocalStorage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailName = this.verifyEmailName.bind(this);
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
  }

  componentDidMount() {
    this.requestToken();
  }

  async requestToken() {
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(endpoint);
    const data = await response.json();
    this.setState({
      token: data.token,
    });
  }

  createLocalState() {
    const { name, email } = this.state;
    const { getScore, getAssertions } = this.props;
    const newStateStorage = {
      player: {
        name,
        gravatarEmail: email,
        score: getScore,
        assertions: getAssertions,
      },
    };
    localStorage.setItem('state', JSON.stringify(newStateStorage));
  }

  readLocalRanking() {
    const readRanking = JSON.parse(localStorage.getItem('ranking'));
    return readRanking;
  }

  createLocalRanking() {
    const { name } = this.state;
    const { getScore } = this.props;
    const currentRanking = this.readLocalRanking();
    let newRankingStorage = [];

    if (!currentRanking) {
      newRankingStorage = [{ name, picture: '', score: getScore }];
      localStorage.setItem('ranking', JSON.stringify(newRankingStorage));
    }
  }

  createLocalStorage() {
    const { token } = this.state;
    this.createLocalState();
    this.createLocalRanking();
    localStorage.setItem('token', JSON.stringify(token));
  }

  handleSubmit() {
    const { sendName, sendEmail, history } = this.props;
    const { email, name } = this.state;
    sendName(name);
    sendEmail(email);
    this.createLocalStorage();
    history.push('/game');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyEmailName() {
    const { email, name } = this.state;
    const re = /\S+@\S+\.\S+/;
    return re.test(email) && name.length;
  }

  handleSettingsButton() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { email, name } = this.state;
    return (
      <div className="container-login">
        <header className="header-container">
          <h1>Trivia Project</h1>
        </header>
        <form className="container-form">
          <label htmlFor="name">
            Nome
            <input
              placeholder="Nome"
              data-testid="input-player-name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
              name="name"
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              placeholder="Email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
              name="email"
            />
          </label>
        </form>
        <section className="container-buttons">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !this.verifyEmailName() }
            onClick={ this.handleSubmit }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettingsButton }
          >
            Configurações
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ scoreReducer }) => ({
  getScore: scoreReducer.score,
  getAssertions: scoreReducer.correctAnswers,
});

const mapDispatchToProps = (dispatch) => ({
  sendName: (name) => dispatch(getName(name)),
  sendEmail: (email) => dispatch(getEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  sendName: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getScore: PropTypes.number.isRequired,
  getAssertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
