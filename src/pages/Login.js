import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail, getName } from '../actions';
import '../css/Login.css';
import { readLocalRanking } from '../utils/utils';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      token: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyEmailName = this.verifyEmailName.bind(this);
    this.requestToken = this.requestToken.bind(this);
    this.createLocalStorage = this.createLocalStorage.bind(this);
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
  }

  componentDidMount() {
    this.requestToken();
  }

  handleSubmit() {
    const { sendEmail, history, sendName } = this.props;
    const { email, name } = this.state;
    sendEmail(email);
    sendName(name);
    this.createLocalStorage();
    history.push('/game');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSettingsButton() {
    const { history } = this.props;
    history.push('/settings');
  }

  verifyEmailName() {
    const { email, name } = this.state;
    const re = /\S+@\S+\.\S+/;
    return re.test(email) && name.length;
  }

  async requestToken() {
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(endpoint);
    const data = await response.json();
    this.setState({
      token: data.token,
    });
  }

  createLocalStorage() {
    const { name, email, token } = this.state;
    const rankingState = readLocalRanking();
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };

    let ranking;
    if (!rankingState) {
      ranking = [];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }

    const tokenData = { token };
    localStorage.setItem('state', JSON.stringify(state));
    localStorage.setItem('token', JSON.stringify(tokenData));
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

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(getEmail(email)),
  sendName: (name) => dispatch(getName(name)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  sendName: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
