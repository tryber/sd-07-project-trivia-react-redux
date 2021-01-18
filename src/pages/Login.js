import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    const { signin } = this.props;
    return (
      <div className="login">
        <main className="main">
          <div className="form">
            <h1>
              Trivia Reduxidil Game
            </h1>
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
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleInputChange }
            />
            <button
              className="input"
              type="button"
              disabled={ disabled }
              data-testid="btn-play"
              onClick={ async () => {
                const { history } = this.props;
                await signin({ name, email });
                history.push('/game');
              } }
            >
              Play
            </button>
          </div>
        </main>
        <footer className="footer">
          <Link className="settings" data-testid="btn-settings" to="/settings">
            +
          </Link>
        </footer>
      </div>
    );
  }
}

Login.propTypes = {
  signin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signin: (value) => dispatch(login(value)),
});

export default connect(null, mapDispatchToProps)(Login);
