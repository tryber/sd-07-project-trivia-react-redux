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
    const { changeName, changeGravatarEmail } = this.props;
    this.setState({ [name]: value }, () => {
      const { email, name: nameState } = this.state;
      const validacaoByStackOf = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
      const matchEmail = email.match(validacaoByStackOf);
      this.matchingEmail(matchEmail);
      changeName(nameState);
      changeGravatarEmail(email);

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
    const { name, email } = this.state;
    changeName(name);
    console.log('teste name em login: ', name);
    changeGravatarEmail(email);
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
  changeGravatarEmail: (email) => dispatch(changeGravatarEmail(email)),
  changeName: (name) => dispatch(changeName(name)),
});

const mapStateToProps = (state) => ({
  name: state.Header.name,
  assertions: state.Header.assertions,
  score: state.Header.score,
  gravatarEmail: state.Header.gravatarEmail,
  loading: state.Header.loading,
  token: state.Header.token,
});

Login.propTypes = {
  requestAPI: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
  changeGravatarEmail: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
