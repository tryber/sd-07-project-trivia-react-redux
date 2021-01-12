import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.validateEmailAndName = this.validateEmailAndName.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      name: '',
      gravatarEmail: '',
      isButtonAble: true,
    };
  }

  validateEmailAndName(email, name) {
    const re = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    const validate = !!((re.test(email.toLowerCase()) && name !== ''));
    return validate;
  }

  handleInputChange({ target: { id, value } }) {
    this.setState({ [id]: value }, () => {
      const { gravatarEmail, name } = this.state;
      const validate = this.validateEmailAndName(gravatarEmail, name)
        ? this.setState({ isButtonAble: false })
        : this.setState({ isButtonAble: true });
      return validate;
    });
  }

  render() {
    const { name, gravatarEmail, isButtonAble } = this.state;
    return (
      <form>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={ name }
          onChange={ this.handleInputChange }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="gravatarEmail"
          id="gravatarEmail"
          value={ gravatarEmail }
          onChange={ this.handleInputChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isButtonAble }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
