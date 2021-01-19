import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchToken, fetchGravatar } from '../actions';

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
    this.loadRankingToLocalStorage = this.loadRankingToLocalStorage.bind(this);
    this.loadStateToLocalStorage = this.loadStateToLocalStorage.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }

  loadTokenToLocalStorage() {
    const { token } = this.props;
    const { tokenData } = token;
    if (Storage) {
      const getTokenSaved = JSON.parse(localStorage.getItem('token'));
      const value = (getTokenSaved === null ? [] : getTokenSaved);
      // console.log(tokenData);
      value.push(tokenData);
      localStorage.setItem('token', JSON.stringify(value));
    }
  }

  loadRankingToLocalStorage() {
    const { name } = this.state;
    const { gravatar } = this.props;
    const { hashData } = gravatar;
    const ranking = {
      name,
      score: 0,
      picture: hashData,
    };
    if (Storage) {
      const getRakingSaved = JSON.parse(localStorage.getItem('ranking'));
      const value = (getRakingSaved === null ? [] : getRakingSaved);
      value.push(ranking);
      localStorage.setItem('ranking', JSON.stringify(value));
    }
  }

  loadStateToLocalStorage() {
    const { name, email } = this.state;
    const newPlayer = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.removeItem('state');
    localStorage.setItem('state', JSON.stringify(newPlayer));
  }

  async handleFetch() {
    const { apiFetchToken, apiFetchGravatar } = this.props;
    const { email } = this.state;
    const hash = md5(email).toString().toLocaleLowerCase().trim(); // https://www.gravatar.com/avatar/b463ad6c517f53d7b179ece3079c23ed
    await apiFetchGravatar(hash);
    await apiFetchToken();
    this.loadTokenToLocalStorage();
    this.loadRankingToLocalStorage();
    this.loadStateToLocalStorage();
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
    const { history } = this.props;
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
        <button
          id="entryButton"
          type="submit"
          data-testid="btn-play"
          disabled={ !doneName || !doneEmail }
          onClick={ (event) => { this.handleChange(event); history.push('/play'); } }
        >
          Jogar
        </button>
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
  gravatar: state.gravatar,
});

const mapDispatchToProps = (dispatch) => ({
  apiFetchToken: () => dispatch(fetchToken()),
  apiFetchGravatar: (value) => dispatch(fetchGravatar(value)),
});

Login.propTypes = {
  token: PropTypes.shape().isRequired,
  apiFetchToken: PropTypes.func.isRequired,
  apiFetchGravatar: PropTypes.func.isRequired,
  gravatar: PropTypes.objectOf.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
