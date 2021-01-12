import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
    };

    this.isDisabled = this.isDisabled.bind(this);
  }

  isDisabled() {
    const { email, name } = this.state;
    const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const nameMinLegth = 1;
    return regEmail.test(email) && name.length >= nameMinLegth;
  }

  render() {
    const { history } = this.props;
    console.log(this.props);
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
        <form>
          <input
            type="email"
            required="required"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
          <input
            type="text"
            required="required"
            name="name"
            data-testid="input-player-name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !this.isDisabled() }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

export default LoginForm;
