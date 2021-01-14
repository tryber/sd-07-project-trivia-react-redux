import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, fetchToken, fetchQuestions } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.saveToken = this.saveToken.bind(this);
    this.setToken = this.setToken.bind(this);
    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.settingsButton = this.settingsButton.bind(this);
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

  settingsButton() {
    const { history } = this.props;
    history.push('/settings');
  }

  async setToken() {
    const { token } = this.state;
    this.setState({
      token: token.token,
    });
  }

  async fetchQuestion() {
    const { getQuestions, token } = this.props;
    await getQuestions(token);
  }

  async saveToken() {
    const { token, name, email } = this.state;
    const { userLogin, history } = this.props;
    userLogin(email, name);
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.settingsButton }
        >
          Settings
        </button>
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
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !email || !name }
          onClick={ this.saveToken }
        >
          Jogar
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  fetchTokenAction: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTokenAction: () => dispatch(fetchToken()),
  userLogin: (email, name) => dispatch(login(email, name)),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
