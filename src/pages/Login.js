import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../actions';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  isEmailValid(email) {
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(format)) return true;
    return false;
  }

  isNameValid(name) {
    const MIN_LENGTH = 3;
    if (name.length >= MIN_LENGTH) return true;
    return false;
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { email, name: playerName } = this.state;
      if (this.isEmailValid(email) && this.isNameValid(playerName)) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  render() {
    const { email, name, disabled } = this.state;
    const { signin, redirect } = this.props;
    return (
      <div className="login">
        <div className="form">
          <input
            className="input text"
            type="name"
            name="name"
            placeholder="Name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleInputChange }
          />
          <input
            className="input text"
            type="text"
            name="email"
            placeholder="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleInputChange }
          />
          <button
            className="input"
            type="button"
            disabled={ disabled }
            data-testid="btn-play"
            onClick={ () => {
              signin({ name, email });
            } }
          >
            Play
          </button>
        </div>
        {redirect && (
          <Redirect to="/game" />
        )}
        <Link to="/settings" />
      </div>
    );
  }
}

Login.propTypes = {
  signin: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  redirect: state.player.redirect,
});

const mapDispatchToProps = (dispatch) => ({
  signin: (value) => dispatch(login(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
