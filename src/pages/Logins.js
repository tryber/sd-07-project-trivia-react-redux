import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      emaiOk: false,
      buttonDisable: true,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.matchingEmail = this.matchingEmail.bind(this);
  }

  handleInputs({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      const { email } = this.state;
      const validacaoByStackOf = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
      const matchEmail = email.match(validacaoByStackOf);
      this.matchingEmail(matchEmail);
    });
  }

  matchingEmail(matchEmail) {
    if (matchEmail) {
      this.setState({ emaiOk: true }, () => {
        const { name, emaiOk } = this.state;
        if (name && emaiOk) {
          this.setState({ buttonDisable: false });
        }
      });
    }
  }

  render() {
    const { buttonDisable } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Nick"
            data-testid="input-player-name"
            onChange={ this.handleInputs }
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleInputs }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ buttonDisable }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
