import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getAPIToken } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      subimitDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.verifyLogin());
  }

  verifyLogin() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ subimitDisabled: false });
    }
  }

  async handleSubmit() {
    const { getToken } = this.props;
    await getToken();
  }

  render() {
    const { subimitDisabled, name, email } = this.state;

    return (
      <div>
        <form>
          <input
            onChange={ (event) => this.handleChange(event) }
            type="text"
            value={ name }
            name="name"
            data-testid="input-player-name"
          />
          <input
            type="text"
            onChange={ (event) => this.handleChange(event) }
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
          />
          <Link to="/telaDeJogo">
            <button
              onClick={ this.handleSubmit }
              disabled={ subimitDisabled }
              type="button"
              data-testid="btn-play"
            >
              Jogar
            </button>
          </Link>
          <Link to="/telaDeConfiguracoes">
            <button type="button" data-testid="btn-settings">
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getToken: () => dispatch(getAPIToken()),
  };
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
