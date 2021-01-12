import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      token: '',
    };
    this.testEmail = this.testEmail.bind(this);
    this.testName = this.testName.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadTokenToLocalStorage = this.loadTokenToLocalStorage.bind(this);
  }

  componentDidMount() { this.handleFetch(); }

  loadTokenToLocalStorage() {
    // const { token } = this.state;
    const { token } = this.props;
    const { tokenData } = token;
    // console.log(this.props);
    // console.log(tokenData);
    if (Storage) {
      const getTokenSaved = JSON.parse(localStorage.getItem('token'));
      const value = (getTokenSaved === null ? [] : getTokenSaved);
      // let value;
      console.log(tokenData);
      value.push(tokenData);
      localStorage.setItem('token', JSON.stringify(value));
    }
  }

  handleFetch() {
    const { apiFetchToken } = this.props;
    // const { token } = this.state;
    // const newToken = await apiFetchToken();
    apiFetchToken();
    this.loadTokenToLocalStorage();
    // this.setState({
    //   token: newToken.token,
    // });
  }

  handleChange(event) {
    event.preventDefault();
    // console.log(this.props);
    this.handleFetch();
    console.log(this.state); // deve trazer o estado name, email e token. doneName e doneEmail false
    // this.loadTokenToLocalStorage(); //Logica para passar token do estado para localStorage
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
    // console.log(this.props);
    const { email, name, doneEmail, doneName } = this.state;
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
