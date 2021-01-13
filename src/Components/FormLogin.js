import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { setUserLogin } from '../actions';
import { getToken } from '../service/apiTrivia';

class FormLogin extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick(name, email) {
    const { setUser } = this.props;
    setUser(name, email);
    const { token } = await getToken();
    localStorage.setItem('token', token);
    const state = {
      player: {
        nome: name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { name, email, redirect } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="text"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          onClick={ () => this.handleClick(name, email) }
          disabled={ name.length === 0 || email.length === 0 }
        >
          Jogar
        </button>
        {(redirect) && <Redirect to="/game" />}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (name, email) => dispatch(setUserLogin(name, email)),
});

FormLogin.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FormLogin);
