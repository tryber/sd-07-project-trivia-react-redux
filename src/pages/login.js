import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, userEmail } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.click = this.click.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  click() {
    const { nameDispatch, emailDispatch } = this.props;
    const { name, email } = this.state;
    nameDispatch(name);
    emailDispatch(email);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input
          name="name"
          value={ name }
          data-testid="input-player-name"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ (event) => this.handleChange(event) }
        />
        <button data-testid="btn-play" type="button" onClick={ this.click }>Jogar</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  nameDispatch: (name) => dispatch(login(name)),
  emailDispatch: (email) => dispatch(userEmail(email)),
});

Login.propTypes = {
  nameDispatch: PropTypes.func.isRequired,
  emailDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
