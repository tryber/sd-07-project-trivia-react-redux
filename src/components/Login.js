import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '',
      email: '',
    };
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  validateInputs() {
    const { name, email } = this.state;
    return name && email;
  }

  handleClick() {
    const { history, tokenAction, token } = this.props;
    history.push('/gamepage');
    tokenAction();
    localStorage.setItem('token', token);
  }

  // componentDidMount() {
  //   const storedToken = localStorage.getItem('token');
  // }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="password">
            Nome
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={this.handleInput}
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite o seu e-mail"
              value={email}
              onChange={this.handleInput}
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={!this.validateInputs()}
            onClick={this.handleClick}
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={() => handleSettings()}
          >
            Configuração
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

const mapDispatchToProps = (dispatch) => ({
  tokenAction: () => dispatch(actions.fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  tokenAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
