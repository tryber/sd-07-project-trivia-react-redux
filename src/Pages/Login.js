import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      validate: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validInputs = this.validInputs.bind(this);
  }

  validInputs() {
    const { email, name } = this.state;
    const minNumber = 0;
    if (email.match(/\S+@\S+\.\S+/) && name.length > minNumber) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validInputs);
  }

  render() {
    const { validate, email, name } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              id="email"
              placeholder="E-Mail"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="name">
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              value={ name }
              id="name"
              placeholder="Nome"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ validate }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
