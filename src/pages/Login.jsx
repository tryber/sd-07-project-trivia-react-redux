import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getToken } from '../services/API';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      isRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.handleAPIRequest = this.handleAPIRequest.bind(this);
  }

  validate() {
    const { email, name } = this.state;
    if (email.length && name.length) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });

    this.validate();
  }

  saveLocalStorage({ token }) {
    const { name, email } = this.state;
    const objectPlayer = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify(objectPlayer));
    this.setState({
      isRedirect: true,
    });
  }

  async handleAPIRequest() {
    const response = await getToken();
    this.saveLocalStorage(response);
  }

  render() {
    const { handleChange } = this;
    const { name, email, isDisabled, isRedirect } = this.state;
    if (isRedirect) {
      return <Redirect to="/game" />;
    }
    return (
      <div>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              id="input-player-name"
              name="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ (event) => handleChange(event) }
            />
          </label>

          <label htmlFor="input-gravatar-email">
            Email:
            <input
              id="input-gravatar-email"
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ (event) => handleChange(event) }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            data-testid="btn-play"
            onClick={ () => this.handleAPIRequest() }
          >
            Jogar
          </button>
        </form>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

/* /* const mapStateToProps = (state) => ({

}); */

/* const mapDispatchToProps = (dispatch) => ({
  dispatchTrivia: (token) => dispatch(getTriviaQuestions(token)),
}); */

/* export default connect(null, mapDispatchToProps)(Login) */
export default Login;
