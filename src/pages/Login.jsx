import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchToken } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      doneEmail: false,
      doneName: false,
    };
    this.testEmail = this.testEmail.bind(this);
    this.testName = this.testName.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadTokenToLocalStorage = this.loadTokenToLocalStorage.bind(this);
  }

  componentDidMount() { this.handleFetch(); }

  loadTokenToLocalStorage() {
    const { token } = this.props;
    const { tokenData } = token;

    if (Storage) {
      const getTokenSaved = JSON.parse(localStorage.getItem('token'));
      const value = (getTokenSaved === null ? [] : getTokenSaved);
      console.log(tokenData);
      value.push(tokenData);
      localStorage.setItem('token', JSON.stringify(value));
    }
  }

  handleFetch() {
    const { apiFetchToken } = this.props;
    apiFetchToken();
    this.loadTokenToLocalStorage();
  }

  handleChange(event) {
    event.preventDefault();
    this.handleFetch();
  }

  testEmail(value) {
    const isValid = value.match(/^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/);
    if (isValid) {
      return this.setState({ email: value, doneEmail: true });
    }
    return this.setState({ email: value, doneEmail: false });
  }

  testName(value) {
    if (value.lenght !== 0) return this.setState({ name: value, doneName: true });
  }

  render() {
    console.log(this.props);
    const { email, name, doneEmail, doneName } = this.state;
    const { token } = this.props;
    if (token.tokenData !== '') {
      return <Redirect to="/play" />;
    }
    return (
      <form className="form">
        <label htmlFor="name">
          Name
          <input
            required
            id="name"
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ (e) => this.testName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            required
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ (e) => this.testEmail(e.target.value) }
          />
        </label>

        <Link to="/play">
          <button
            id="entryButton"
            type="submit"
            data-testid="btn-play"
            disabled={ !doneName || !doneEmail }
            onClick={ (event) => this.handleChange(event) }
          >
            Jogar
          </button>
        </Link>

        <div>
          <Link to="/ranking">Ranking</Link>
          <Link data-testid="btn-settings" to="/configuration">Configurações</Link>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  apiFetchToken: () => dispatch(fetchToken()),
});

Login.propTypes = {
  token: PropTypes.shape().isRequired,
  apiFetchToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
