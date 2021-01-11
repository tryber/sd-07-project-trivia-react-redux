import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendLoginInfo } from '../redux/actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    }

    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  isValid() {
    const { name, email } = this.state;
    const emailValid = /\S+@\S+\.\S+/;
    if(name !== '' && emailValid.test(email)) {
      return false;
    }

    return true;
  }

  handleChange({ target }) {
    const { name, value }  = target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    const { sendLogin } = this.props;
    return(
      <>
        <div className="App">
          <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          </header>
        </div>

        <form>
          <input
            type="text"
            name="name"
            value={ name }
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />

          <input 
            type="email"
            name="email"
            value={ email }
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />

          <button
            type="button"
            disabled={ this.isValid() }
            data-testid="btn-play"
            onClick={ () => sendLogin({ name, email }) }
          >
            Jogar
          </button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (info) => dispatch(sendLoginInfo(info)),
});

export default connect(null, mapDispatchToProps)(Login);
