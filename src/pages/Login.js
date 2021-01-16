import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getAPIToken, getQuestions, login } from '../actions';

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
    const { getToken, getAPIQuestions, history, logiName } = this.props;
    const { name, email } = this.state;
    await getToken();
    await getAPIQuestions();
    logiName(name, email);
    history.push('/telaDeJogo');
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
          <button
            onClick={ this.handleSubmit }
            disabled={ subimitDisabled }
            type="button"
            data-testid="btn-play"
          >
            Jogar
          </button>
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

const mapDispatchToProps = (dispatch) => ({
  getAPIQuestions: () => dispatch(getQuestions()),
  getToken: () => dispatch(getAPIToken()),
  logiName: (name, email) => dispatch(login(name, email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getToken: PropTypes.func.isRequired,
  getAPIQuestions: PropTypes.func.isRequired,
  logiName: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
