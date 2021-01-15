import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/header.css';
import { login, userEmail, getToken } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      auth: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.click = this.click.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.emailValidation();
  }

  emailValidation() {
    const { email, name, auth } = this.state;
    console.log(auth);
    const magicNumber = 0;
    if (email.match(/\S+@\S+\.\S+/) && name.length > magicNumber) {
      return this.setState({ auth: true });
    }
  }

  async click() {
    const { nameDispatch, emailDispatch, token, history } = this.props;
    const { name, email } = this.state;
    nameDispatch(name);
    emailDispatch(email);
    token();
    history.push('/play');
  }

  // <div>
  //   <div class="ui icon input">
  //     <input type="text" placeholder="Search..."/>
  //       <i aria-hidden="true" class="search icon" /i>
  //   </div>
  //   <br/>
  //   <br/>
  // <div class="ui left icon input">
  //   <i aria-hidden="true" class="at icon" />
  //     <input type="text" placeholder="Email"/>
  //   </div>
  // </div>

  render() {
    const { name, email, auth } = this.state;
    return (
      <div className="centralizando">
        <div className="ui left icon input">
          <i aria-hidden="true" className="users icon" />
          <input
            type="text"
            id="input-name"
            placeholder="Seu nome"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ (event) => this.handleChange(event) }
          />
        </div>
        <div className="ui left icon input">
          <i aria-hidden="true" className="at icon" />
          <input
            type="text"
            id="input-email"
            placeholder="Email"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ (event) => this.handleChange(event) }
          />
        </div>
        <div>
          <br />
          <button
            className="ui medium button"
            data-testid="btn-play"
            type="button"
            onClick={ this.click }
            disabled={ !auth }
          >
            Jogar
          </button>
          <Link to="/settings">
            <button
              className="ui medium button"
              data-testid="btn-settings"
              type="button"
            >
              Settings
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  nameDispatch: (name) => dispatch(login(name)),
  emailDispatch: (email) => dispatch(userEmail(email)),
  token: () => dispatch(getToken()),
});

Login.propTypes = {
  nameDispatch: PropTypes.func.isRequired,
  emailDispatch: PropTypes.func.isRequired,
  token: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
