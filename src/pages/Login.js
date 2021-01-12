import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      name: '',
    };
  }

  // handleChange(event) {
  //   const { email, validateEmail } = this.state;
  //   this.setState({ [event.target.name]: event.target.value });
  //   const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  //   const isEmailValid = email.match(emailRegex);
  //   console.log(isEmailValid);
  //   const emailRegex = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
  //   const isEmailValid = email.match(emailRegex);

  //   if (isEmailValid) {
  //     this.setState({ validateEmail: true });
  //   } else {
  //     this.setState({ validateEmail: false });
  //   }
  //   console.log(validateEmail);
  // }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <form>
          <input
            value={ name }
            name="name"
            type="text"
            data-testid="input-player-name"
            placeholder="Digite seu nome"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu e-mail"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
        </form>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !email || !name }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
