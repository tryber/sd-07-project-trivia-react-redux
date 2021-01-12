import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClickSettings.bind(this);
    this.state = {
      nome: '',
      email: '',
    };
  }

   handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClickSettings() {
    const { history } = this.props;
    history.push("./settings")
  }

  render() {
    const { nome, email } = this.state;
    return (
      <div>
        <button data-testid="btn-settings" onClick={ this.handleClickSettings }>Configurações</button>
        <input
          type="text"
          name="nome"
          value={ nome }
          data-testid="input-player-name"
          placeholder="Nome"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          placeholder="E-mail"
          onChange={ this.handleChange }
        />
        {email.length !== 0 && nome.length !== 0 ? (
          <button type="button" data-testid="btn-play">
            Jogar
          </button>
        ) : (
          <button type="button" data-testid="btn-play" disabled>
            Jogar
          </button>
        )}
      </div>
    );
  }
}

export default Login;
