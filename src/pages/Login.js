import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchTokenAction, playerLoginAction } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      emailGravatar: '',
      btnDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.toggleButton();
    });
  }

  toggleButton() {
    const { emailGravatar, name } = this.state;
    const btnDisable = (emailGravatar === '' || name === '');
    this.setState({ btnDisable });
  }

  btnClick() {
    const { login, idToken } = this.props;
    const { name, emailGravatar } = this.state;
    login({ name, emailGravatar });
    idToken();
  }

  render() {
    const { name, emailGravatar, btnDisable } = this.state;
    return (
      <div>
        <input
          name="name"
          type="text"
          placeholder="name"
          data-testid="input-player-name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          name="emailGravatar"
          type="email"
          placeholder="email"
          data-testid="input-gravatar-email"
          value={ emailGravatar }
          onChange={ this.handleChange }
        />
        <Link to="/Game">
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ btnDisable }
            onClick={ this.btnClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/Settings" className="button">
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
const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(playerLoginAction(e)),
  idToken: () => dispatch(fetchTokenAction()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  createToken: PropTypes.func.isRequired,
};
