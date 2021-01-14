import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { requestToken, changeName, changeGravatarEmail } from '../actions';

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
    const { newName, changeEmail } = this.props;
    this.setState({ [name]: value }, () => {
      const { email, name: nameState } = this.state;
      const validacaoByStackOf = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
      const matchEmail = email.match(validacaoByStackOf);
      this.matchingEmail(matchEmail);
      newName(nameState);
      changeEmail(email);
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
    const { requestAPI, history } = this.props;
    const { name, email } = this.state;
    changeName(name);
    console.log('teste name em login: ', name);
    changeGravatarEmail(email);
    requestAPI();
    setTimeout(() => history.push("/game"), 1000);
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
              onClick={ this.startGame }
            >
              Jogar
            </button>
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
  changeEmail: (email) => dispatch(changeGravatarEmail(email)),
  newName: (name) => dispatch(changeName(name)),
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
  newName: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
