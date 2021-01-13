import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTokenAction } from '../../actions/tokenAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      email: '',
      name: '',
    };
    this.changeInputs = this.changeInputs.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async setDisabled() {
    const { email, name } = this.state;
    if (email !== '' && name !== '') {
      await this.setState({ disabled: false });
    } else {
      await this.setState({ disabled: true });
    }
  }

  async changeInputs({ target }) {
    const { name, value } = target;
    await this.setState({ [name]: value });
    await this.setDisabled();
  }

  handleLogin(event) {
    event.preventDefault();
    const { tokenAction, history } = this.props;
    tokenAction();
    if (history) history.push('/game');
  }

  render() {
    const { disabled, email, name } = this.state;
    const { isFetchingToken, error } = this.props;
    return (
      <div>
        <form>
          {isFetchingToken && <div>loading</div>}
          {error && <div>error</div>}
          <label htmlFor="email">
            Email do Gravatar:
            <input
              name="email"
              id="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.changeInputs }
              value={ email }
            />
          </label>

          <label htmlFor="name">
            Nome do Jogador:
            <input
              data-testid="input-player-name"
              name="name"
              id="name"
              type="text"
              onChange={ this.changeInputs }
              value={ name }
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ this.handleLogin }
          >
            Jogar
          </button>
          <button type="button" data-testid="btn-settings">
            <Link to="/Settings">
              Configurações
            </Link>
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  isFetchingToken: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  tokenAction: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ token }) => ({
  isFetchingToken: token.isFetchingToken,
  error: token.error,
});

const mapDispatchToProps = (dispatch) => ({
  tokenAction: () => dispatch(getTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
