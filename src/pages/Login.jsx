import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClickSettings.bind(this);
    this.handleClickGame = this.handleClickGame.bind(this);
    this.state = {
      nome: "",
      email: "",
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }


  handleClickSettings() {
    const { history } = this.props;
    history.push("./settings");
  }
  
  async handleClickGame() {
    const { signIn, history, fetchApi } = this.props;
    const { nome, email } = this.state;

    signIn(nome, email);
    await fetchApi();

    const { game } = this.props;
    localStorage.setItem('token', game.token);

    history.push('/game');
  }

  render() {
    const { nome, email } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClickSettings }
        >
          Configurações
        </button>
        <input
          type="text"
          name="nome"
          value={nome}
          data-testid="input-player-name"
          placeholder="Nome"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          value={email}
          data-testid="input-gravatar-email"
          placeholder="E-mail"
          onChange={ this.handleChange }
        />
        {email.length !== 0 && nome.length !== 0 ? (
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClickGame }
          >
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

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  fetchApi: PropTypes.func.isRequired,
  game: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = {
  signIn: Actions.signIn,
  fetchApi: Actions.fetchApi,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
