import React, { Component } from 'react';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.isDisabled = this.isDisabled.bind(this);
  }

  isDisabled() {
    const { email, name } = this.state;
    const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const nameMinLegth = 1;
    return regEmail.test(email) && name.length >= nameMinLegth;
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="email"
            required="required"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
          <input
            type="text"
            required="required"
            name="name"
            data-testid="input-player-name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !this.isDisabled() }
            // onClick={}
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
