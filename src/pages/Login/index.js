import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      email: '',
      name: '',
    };
    this.changeInputs = this.changeInputs.bind(this);
  }

  async setDisabled() {
    const { email, name } = this.state;
    if (email !== '' && name !== '') {
      await this.setState({ disabled: false });
    } else {
      await this.setState({ disabled: true });
    }
  }

  async changeInputs({ target }) {
    const { name, value } = target;
    await this.setState({ [name]: value });
    await this.setDisabled();
  }

  render() {
    const { disabled, email, name } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email do Gravatar:
            <input
              name="email"
              id="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.changeInputs }
              value={ email }
            />
          </label>

          <label htmlFor="name">
            Nome do Jogador:
            <input
              data-testid="input-player-name"
              name="name"
              id="name"
              type="text"
              onChange={ this.changeInputs }
              value={ name }
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
          >
            Jogar
          </button>
          <button type="button" data-testid="btn-settings">
            <Link to="/Settings">
              Configurações
            </Link>
          </button>

        </form>
      </div>
    );
  }
}

export default Login;
