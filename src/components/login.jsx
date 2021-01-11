import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', userName: '', btnDisabled: true };
    this.handleChange = this.handleChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  componentDidUpdate() {
    const { email, userName, btnDisabled } = this.state;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email) && userName.length > 0 && btnDisabled) {
      this.disableButton(false);
    } else if (!btnDisabled) {
      if (!re.test(email) || !(userName.length > 0)) {
        this.disableButton(true);
      }
    }
  }

  disableButton(bool) {
    this.setState({ btnDisabled: bool });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <div>
        <input
          type="email"
          onChange={ this.handleChange }
          name="email"
          data-testid="input-gravatar-email"
        />
        <input
          type="text"
          onChange={ this.handleChange }
          name="userName"
          data-testid="input-player-name"
        />
        <button
          disabled={ btnDisabled }
          type="button"
          data-testid="btn-play"
        >
          Jogar!
        </button>
      </div>);
  }
}
// agora foi o celular que descarregou
export default Login;
