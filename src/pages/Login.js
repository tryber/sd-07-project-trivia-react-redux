import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handlerInput = this.handlerInput.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handlerInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/.test(email);
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              onChange={ this.handlerInput }
              data-testid="input-gravatar-email"
              name="email"
              id="email"
              type="email"
            />
          </label>
          <label htmlFor="nome">
            Nome:
            <input
              onChange={ this.handlerInput }
              data-testid="input-player-name"
              name="name"
              id="nome"
              type="text"
            />
          </label>

        </form>
        <button
          type="button"
          disabled={ this.validateEmail(email) && name.length !== 0 ? '' : 'disabled' }
          data-testid="btn-play"
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
