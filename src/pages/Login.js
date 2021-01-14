import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tokenAction, addEmailAction, addNameAction } from '../actions';
import api from '../services/api';
import trivia from '../trivia.png';
import tools from '../tools.svg';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.valida = this.valida.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange(e) {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  }

  valida() {
    // eslint-disable-next-line
    const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    const { email, name } = this.state;
    if (pattern.test(email) && name.length > 0) {
      return false;
    }
    return true;
  }

  render() {
    const { history, addToken, addEmail, addName } = this.props;
    const { email, name } = this.state;
    const { returnToken } = api;
    return (
      <form>
        <img
          className="img-trivia"
          src={ trivia }
          alt="Trivia"
        />
        <label
          htmlFor="name"
        >
          Name:
          <input
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="email"
        >
          Email:
          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <div className="button-container">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.valida() }
            onClick={ async () => {
              const token = await returnToken();
              localStorage.clear();
              localStorage.setItem('token', token);
              localStorage.setItem('state', JSON.stringify(
                {
                  player: {
                    name: '',
                    assertions: 0,
                    score: 0,
                    gravatarEmail: '',
                  },
                },
              ));
              addToken(token);
              addEmail(email);
              addName(name);
              history.push('/play');
            } }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            className="btn-config"
            onClick={ () => {
              history.push('/config');
            } }
          >
            <img
              className="config-logo"
              src={ tools }
              alt="Configurações"
            />
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToken: (e) => dispatch(tokenAction(e)),
  addEmail: (email) => dispatch(addEmailAction(email)),
  addName: (name) => dispatch(addNameAction(name)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape.isRequired,
  addToken: PropTypes.func.isRequired,
  addEmail: PropTypes.func.isRequired,
  addName: PropTypes.func.isRequired,
};
