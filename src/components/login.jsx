import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserAvatar, getApiTrivia, getToken } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', userName: '', btnDisabled: true };
    this.handleChange = this.handleChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    const { email, userName, btnDisabled } = this.state;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email) && userName.length > 0 && btnDisabled) {
      this.disableButton(false);
    } else if (!btnDisabled) {
      if (!re.test(email) || !(userName.length > 0)) {
        this.disableButton(true);
      }
    }
  }

  disableButton(bool) {
    this.setState({ btnDisabled: bool });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { email, userName } = this.state;
    const { history, loginAction } = this.props;
    console.log(email);
    loginAction(email, userName);
    const { saveTrivia, saveToken } = this.props;
    await saveToken();
    await saveTrivia();
    history.push('/game');
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="email">
            Email do Gravatar:
            <input
              type="email"
              onChange={ this.handleChange }
              name="email"
              data-testid="input-gravatar-email"
            />
          </label>
        </div>
        <div>
          <label htmlFor="userName">
            Nome do Jogador:
            <input
              type="text"
              onChange={ this.handleChange }
              name="userName"
              data-testid="input-player-name"
            />
          </label>
        </div>
        <button
          disabled={ btnDisabled }
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-play"
        >
          Jogar!
        </button>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: (email, userName) => dispatch(getUserAvatar(email, userName)),
  saveTrivia: () => dispatch(getApiTrivia()),
  saveToken: () => dispatch(getToken()),
});

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
  loginAction: PropTypes.func.isRequired,
  saveToken: PropTypes.func.isRequired,
  saveTrivia: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
