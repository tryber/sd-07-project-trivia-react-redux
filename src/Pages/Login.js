import React from 'react';
import PropTypes from 'prop-types';
import { thunkApiToken } from '../actions';
import { connect } from 'react-redux';
import { setName } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      name: '',
      email: '',
      buttonDisable: true,
    };
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.verificationEmail = this.verificationEmail.bind(this);
    this.addToken = this.addToken.bind(this);
    this.routeChangeConfig = this.routeChangeConfig.bind(this);
    this.routeChangeGame = this.routeChangeGame.bind(this);
  }

  verificationEmail() {
    const { email } = this.state;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    return regex.test(email);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.enableButton();
    });
  }

  routeChangeConfig() {
    const { history } = this.props;
    history.push('/configuracoes');
  }

  routeChangeGame() {
    const { email } = this.state;
    const { history, sendName } = this.props;
    console.log(this.props)
    sendName(email);
    // this.addToken();
    history.push('/game');
  }

  async addToken() {
    const fetchToken = await thunkApiToken();
    console.log(fetchToken);
    const { token } = fetchToken;
    console.log(token);
    if (Storage) {
      const tokens = JSON.parse(localStorage.getItem('token'));
      const values = tokens === null ? [] : tokens;
      values.push(token);
      localStorage.setItem('token', JSON.stringify(values));
    }
  }

  enableButton() {
    const { name } = this.state;
    if (name.length !== 0 && this.verificationEmail()) {
      return this.setState({ buttonDisable: false });
    }
    this.setState({ buttonDisable: true });
  }

  render() {
    const { buttonDisable, name, email } = this.state;
    return (
      <div>
        <button
          type="button"
          onClick={ this.routeChangeConfig }
        >
          Configurações
        </button>
        <input
          type="text"
          name="name"
          value={ name }
          placeholder="insira seu nome"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="email"
          value={ email }
          placeholder="insira seu email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          name="buttonDisable"
          disabled={ buttonDisable }
          onClick={ this.routeChangeGame }
        >
          Jogar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendName: (email) => dispatch(setName(email))
});

export default connect(null, mapDispatchToProps)(Login);

