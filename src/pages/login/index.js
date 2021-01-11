import React, { Component } from 'react';

class login extends Component {
  constructor(props) {
    super(props);

    this.validateEmail = this.validateEmail.bind(this);

    this.state = {
      name: '',
      gravatarEmail: '',
      isButtonAble: false,
    };
  }

  validateEmail(email) {
    let isButtonAble = false;
    const re = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    if (re.test(email.toLowerCase())) {
      isButtonAble = true;
    }
    this.setState({
      email,
      isButtonAble,
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
          placeholder="Enter your name"
          value={ name }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="gravatarEmail"
          value={ gravatarEmail }
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

export default login;
