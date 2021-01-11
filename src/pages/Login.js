import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addInfo from '../store/ducks/UserInfo/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      nome: '',
      isValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, name } }) {
    const { email, nome } = this.state;
    this.setState({ [name]: value }, () => {
      if (email !== '' && nome !== '') {
        return this.setState({ isValid: true });
      }
      return this.setState({ isValid: false });
    });
  }

  render() {
    const { actionInfo } = this.props;
    const { email, nome, isValid } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email
            <input
              value={ email }
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="nome">
            Nome
            <input
              value={ nome }
              type="text"
              name="nome"
              placeholder="Nome"
              id="nome"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>

          <button
            disabled={ !isValid }
            type="button"
            data-testid="btn-play"
            onClick={ () => actionInfo({ email, nome }) }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { actionInfo: addInfo };

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  actionInfo: PropTypes.func.isRequired,
};
