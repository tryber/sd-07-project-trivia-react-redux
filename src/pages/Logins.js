import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { requestToken } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      emaiOk: false,
      buttonDisable: true,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.matchingEmail = this.matchingEmail.bind(this);
    this.startGame = this.startGame.bind(this);
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

  startGame() {
    const { requestAPI } = this.props;
    requestAPI();
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
          <Link to="./game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ buttonDisable }
              onClick={ this.startGame }
            >
              Jogar
            </button>
          </Link>
          <Link to="./config">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestAPI: () => dispatch(requestToken()),
});

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  loading: state.player.loading,
  token: state.player.token,
});

Login.propTypes = {
  requestAPI: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
