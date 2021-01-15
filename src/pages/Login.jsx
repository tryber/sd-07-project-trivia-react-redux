import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestToken } from '../services/api';
import { fetchQuestions, login } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.verifyLogin = this.verifyLogin.bind(this);
    this.getToken = this.getToken.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  async getToken() {
    const { fetchTrivia } = this.props;
    await requestToken();
    console.log('oi')
    fetchTrivia();
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
                this.getToken();
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
  fetchTrivia: () => dispatch(fetchQuestions()),
});
export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveUserInfos: PropTypes.func.isRequired,
  fetchTrivia: PropTypes.func.isRequired,
};
