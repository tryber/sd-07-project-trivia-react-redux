import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../../store/ducks/user';
import { fetchTriviaToken } from '../../store/ducks/triviaToken';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.playClick = this.playClick.bind(this);
  }

  isValid(name, gravatarEmail) {
    return name && gravatarEmail;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async playClick(name, gravatarEmail) {
    const { saveUser, getTriviaToken, history } = this.props;
    saveUser({ name, gravatarEmail });
    await getTriviaToken();
    history.push('/game');
  }

  render() {
    const { name, gravatarEmail } = this.state;
    const { isLoading } = this.props;
    return (
      <form>
        <input
          name="name"
          value={ name }
          type="text"
          data-testid="input-player-name"
          placeholder="Name"
          onChange={ this.handleChange }
        />
        <input
          name="gravatarEmail"
          value={ gravatarEmail }
          type="text"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !this.isValid(name, gravatarEmail) }
          onClick={ () => this.playClick(name, gravatarEmail) }
        >
          Play
        </button>
        {isLoading && <h1>Loading...</h1>}
      </form>
    );
  }
}

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
  getTriviaToken: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.triviaToken.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  saveUser: (info) => dispatch(signIn(info)),
  getTriviaToken: () => dispatch(fetchTriviaToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
