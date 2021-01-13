import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      subimitDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.verifyLogin());
  }

  verifyLogin() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ subimitDisabled: false });
    }
  }

  render() {
    const { subimitDisabled, name, email } = this.state;

    return (
      <div>
        <form>
          <input
            onChange={ (event) => this.handleChange(event) }
            type="text"
            value={ name }
            name="name"
            data-testid="input-player-name"
          />
          <input
            type="text"
            onChange={ (event) => this.handleChange(event) }
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
          />
          <button disabled={ subimitDisabled } type="button" data-testid="btn-play">
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
