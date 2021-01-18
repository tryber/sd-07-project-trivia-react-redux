import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.verifyLogin = this.verifyLogin.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  saveScoreLocalStorage(name, email) {
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  verifyLogin() {
    const { name, email } = this.state;

    if (name && email) {
      return false;
    }
    return true;
  }

  render() {
    const { name, email } = this.state;
    const { saveUserInfos } = this.props;
    return (
      <div>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
        <form>
          <input
            type="text"
            value={ name }
            placeholder="Digite seu nome"
            data-testid="input-player-name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />

          <input
            type="email"
            value={ email }
            placeholder="Digite seu email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />

          <Link to="/play">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ this.verifyLogin() }
              onClick={ () => {
                this.saveScoreLocalStorage(name, email);
                saveUserInfos(name, email);
              } }
            >
              Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserInfos: (name, email) => dispatch(login(name, email)),
});
export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveUserInfos: PropTypes.func.isRequired,
};
