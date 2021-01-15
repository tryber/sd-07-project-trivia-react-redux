import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { clickJogar } from '../../redux/actions/userActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userEmail: '',
      access: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
  }

  handleInput({ target }) {
    this.setState({ [target.name]: target.value }, this.verifyInput);
  }

  verifyInput() {
    const { username, userEmail } = this.state;
    if (username !== '' && userEmail !== '') {
      this.setState({ access: true });
    } else this.setState({ access: false });
  }

  render() {
    const { username, userEmail, access } = this.state;
    const { playGame } = this.props;
    return (
      <form>
        <input
          type="text"
          name="username"
          id="username"
          value={ username }
          data-testid="input-player-name"
          onChange={ this.handleInput }
        />
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          value={ userEmail }
          data-testid="input-gravatar-email"
          onChange={ this.handleInput }
        />
        <Link to="/game">
          <button
            disabled={ !access }
            type="button"
            data-testid="btn-play"
            onClick={ () => playGame(username, userEmail) }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playGame: (username, userEmail) => dispatch(clickJogar(username, userEmail)),
});

export default connect(null, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  playGame: PropTypes.func.isRequired,
};
