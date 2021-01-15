import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQ, fetchToken } from '../services/API';
import { clickLogin, questionsGen } from '../actions';
import loginImage from '../img/LoginImage.png';

import SettingsButton from '../Components/SettingsButton';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      validate: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validInputs = this.validInputs.bind(this);
    this.login = this.login.bind(this);
  }

  validInputs() {
    const { email, name } = this.state;
    const minNumber = 0;
    if (email.match(/\S+@\S+\.\S+/) && name.length > minNumber) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validInputs);
  }

  async login() {
    const { email, name } = this.state;
    const { texts, questionsGenerator, history } = this.props;
    texts(email, name);
    await fetchToken();
    const questionsList = await fetchQ();
    questionsGenerator(questionsList);
    history.push('/questions-page');
  }

  render() {
    const { validate, email, name } = this.state;
    return (
      <div className="login-page">
        <div>
          <img src={ loginImage } alt="" />
        </div>
        <div className="login-area">
          <SettingsButton />
          <div className="login-welcome-area">
            <p className="login-welcome-text">Boas vindas ao</p>
            <p className="login-assassins-text">Assassin'S</p>
            <p className="login-lint-text">LINT</p>
          </div>
          <form className="login-form">
            <label htmlFor="email">
              <input
                className="login-input"
                type="email"
                data-testid="input-gravatar-email"
                name="email"
                value={ email }
                id="email"
                placeholder="E-Mail do Gravatar"
                onChange={ (e) => this.handleChange(e) }
              />
            </label>
            <label htmlFor="name">
              <input
                className="login-input"
                type="text"
                data-testid="input-player-name"
                name="name"
                value={ name }
                id="name"
                placeholder="Nome do Jogador"
                onChange={ (e) => this.handleChange(e) }
              />
            </label>
            <button
              className="login-button-play"
              data-testid="btn-play"
              type="button"
              disabled={ validate }
              onClick={ this.login }
            >
              Jogar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  texts: (email, name) => dispatch(clickLogin({ email, name })),
  questionsGenerator: (questionsList) => dispatch(questionsGen({ questionsList })),
});

Login.propTypes = {
  texts: PropTypes.func.isRequired,
  questionsGenerator: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
