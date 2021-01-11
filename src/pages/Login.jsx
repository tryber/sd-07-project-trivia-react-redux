import React from 'react';
import * as api from '../services/api.js'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      nome: '',
      email: '',
    };
  }

  componentDidMount() {
    async function teste() {
    const data = await api.fetchTrivia();
    console.log(data);
  } 
    teste();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { nome, email } = this.state;
    return (
      <div>
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
