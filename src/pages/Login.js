import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CryptoJs from 'crypto-js';
import { connect } from 'react-redux';
import { login, fetchToken, fetchQuestions } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.saveToken = this.saveToken.bind(this);
    this.setToken = this.setToken.bind(this);
    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.state = {
      email: '',
      name: '',
      token: '',
    };
  }

  componentDidMount() {
    const { fetchTokenAction, getQuestions, token } = this.props;
    fetchTokenAction();
    this.setToken();
    getQuestions(token);
  }

  async setToken() {
    const { token } = this.state;
    this.setState({
      token: token.token,
    });
  }

  async fetchQuestion() {
    const { email } = this.state;
    const { getQuestions, token } = this.props;
    const hash = CryptoJs.MD5(email).toString().trim().toLowerCase();
    await getQuestions(token, hash);
  }

  async saveToken() {
    const { token, name, email } = this.state;
    const { userLogin } = this.props;
    userLogin(email, name);
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </Link>
        <form>
          <input
            value={ name }
            name="name"
            type="text"
            data-testid="input-player-name"
            placeholder="Digite seu nome"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu e-mail"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
        </form>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !email || !name }
            onClick={ this.saveToken }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}
Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  fetchTokenAction: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});
const mapDispatchToProps = (dispatch) => ({
  fetchTokenAction: () => dispatch(fetchToken()),
  userLogin: (email, name) => dispatch(login(email, name)),
  getQuestions: (hash, token) => dispatch(fetchQuestions(hash, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
