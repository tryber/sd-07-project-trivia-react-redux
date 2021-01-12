import React from 'react';
import fetchPlayeToken from '../helpers';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      name: '',
      email: '',
      buttonDisable: true,
    };
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.verificationEmail = this.verificationEmail(this);
    this.addToken = this.addToken.bind(this);
  }

  verificationEmail() {
    const { email } = this.state;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    return regex.test(email);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.enableButton();
    });
  }

  addToken() {
    const fetchToken = fetchPlayeToken();
    const { token } = fetchToken;
    if (Storage) {
      const tokens = JSON.parse(localStorage.getItem('token'));
      const values = tokens === null ? [] : tokens;
      values.push(token);
      localStorage.setItem('token', JSON.stringify(values));
    }
  }

  enableButton() {
    const { name } = this.state;
    if (name.length !== 0 && this.verificationEmail()) {
      return this.setState({ buttonDisable: false });
    }
    this.setState({ buttonDisable: true });
  }

  render() {
    const { buttonDisable, name, email } = this.state;
    return (
      <div>
        <input
          type="text"
          name="name"
          value={ name }
          placeholder="insira seu nome"
          data-testid="input-player-name"
          onChange={ this.enableButton }
        />
        <input
          type="text"
          name="email"
          value={ email }
          placeholder="insira seu email"
          data-testid="input-gravatar-email"
          onChange={ this.enableButton }
        />
        <button
          type="button"
          data-testid="btn-play"
          name="buttonDisable"
          disabled={ buttonDisable }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
