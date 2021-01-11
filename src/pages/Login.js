import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyEmailName = this.verifyEmailName.bind(this);
  }

  handleSubmit() {
    const { sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyEmailName() {
    const { email, name } = this.state;
    const re = /\S+@\S+\.\S+/;
    return re.test(email) && name.length;
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>

        <h1> Trivia</h1>

        <label htmlFor="name">
          Nome
          <input
            placeholder="Nome"
            data-testid="input-player-name"
            type="text"
            value={ name }
            onChange={ this.handleChange }
            name="name"
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            placeholder="Email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
            name="email"
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ !this.verifyEmailName() }
          onClick={ this.handleSubmit }
        >
          Jogar
        </button>

      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(getEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
