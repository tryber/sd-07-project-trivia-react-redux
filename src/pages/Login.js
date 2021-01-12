import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail } from '../actions';

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

  createLocalStorage() {
    const { name, email, token } = this.state;

    const info = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
      ranking: [{ name, score: 10, picture: 'url-da-foto-no-gravatar' }],
      token,
    };

    localStorage.setItem('player', JSON.stringify(info));
  }

  async requestToken() {
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(endpoint);
    const token = await response.json();
    this.setState({
      token,
    });
  }

  handleSubmit() {
    const { sendEmail, history } = this.props;
    const { email } = this.state;
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
      <div>
        <h1> Trivia</h1>

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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(getEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
