import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Login.css';
import * as PlayerActions from '../../store/ducks/player/actions';

class Login extends Component {
  constructor() {
    super();

    this.validateEmailAndName = this.validateEmailAndName.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      gravatarEmail: '',
      isButtonAble: true,
    };
  }

  validateEmailAndName(email, name) {
    const re = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    const validate = !!((re.test(email.toLowerCase()) && name !== ''));
    return validate;
  }

  handleInputChange({ target: { id, value } }) {
    this.setState({ [id]: value }, () => {
      const { gravatarEmail, name } = this.state;
      const validate = this.validateEmailAndName(gravatarEmail, name)
        ? this.setState({ isButtonAble: false })
        : this.setState({ isButtonAble: true });
      return validate;
    });
  }

  async handleClick() {
    const { history, signInAction, getTokenAction } = this.props;
    await getTokenAction();
    const { name, gravatarEmail } = this.state;
    const hash = md5(gravatarEmail);
    signInAction({ name, gravatarEmail, hash });
    history.push('/game');
  }

  render() {
    const { name, gravatarEmail, isButtonAble } = this.state;
    return (

      <div className="login-page">
        <Link to="/settings" data-testid="btn-settings">
          Configurações
        </Link>
        <form>
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={ name }
            onChange={ this.handleInputChange }
          />
          <input
            type="text"
            data-testid="input-gravatar-email"
            name="gravatarEmail"
            id="gravatarEmail"
            value={ gravatarEmail }
            onChange={ this.handleInputChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isButtonAble }
            onClick={ () => this.handleClick() }
          >
            Jogar
          </button>
        </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signInAction: (user) => dispatch(PlayerActions.signIn(user)),
  getTokenAction: (() => dispatch(PlayerActions.getToken())),
});

Login.propTypes = {
  signInAction: PropTypes.func.isRequired,
  getTokenAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
