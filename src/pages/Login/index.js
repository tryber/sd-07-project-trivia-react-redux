import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PlayerActions from "../../store/ducks/player/actions";

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
      token: '',
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
    const { history, signInAction } = this.props;
    signInAction(this.state);
    history.push('/game');
  }

  render() {
    const { name, gravatarEmail, isButtonAble } = this.state;
    return (
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
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signInAction: (user) => dispatch(PlayerActions.signIn(user)),
  requestTokenAction: () => dispatch(PlayerActions.requestToken()),
});

export default connect(null, mapDispatchToProps)(Login);
