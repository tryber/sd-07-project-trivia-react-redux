import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      redirect: false,
      token: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyEmailName = this.verifyEmailName.bind(this);
    this.requestToken = this.requestToken.bind(this);
    this.createLocalStorage = this.createLocalStorage.bind(this);
  }

  componentDidMount() {
    this.requestToken();
  }

  createLocalStorage() {
    const { name, email, token } = this.state;

    const info = {
      player: {
        name: name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
      ranking: [{ name: name, score: 10, picture: 'url-da-foto-no-gravatar' }],
      token: token,
    };

    localStorage.setItem('player', JSON.stringify(info));
  }

  async requestToken() {
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(endpoint);
    const token = await response.json();
    
    this.setState({
      token: token
    })
  }

  handleSubmit() {
    const { sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
    this.createLocalStorage();
    this.setState({
      redirect: true,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyEmailName() {
    const { email, name } = this.state;
    const re = /\S+@\S+\.\S+/;
    return re.test(email) && name.length;
  }

  render() {
    const { email, name, redirect, } = this.state;
    if (redirect) return <Redirect to='/game' />;
    return (
      <div>
        <h1> Trivia</h1>

        <label htmlFor='name'>
          Nome
          <input
            placeholder='Nome'
            data-testid='input-player-name'
            type='text'
            value={name}
            onChange={this.handleChange}
            name='name'
          />
        </label>

        <label htmlFor='email'>
          Email
          <input
            placeholder='Email'
            data-testid='input-gravatar-email'
            value={email}
            onChange={this.handleChange}
            name='email'
          />
        </label>

        <button
          type='button'
          data-testid='btn-play'
          disabled={!this.verifyEmailName()}
          onClick={this.handleSubmit}>
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(getEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
