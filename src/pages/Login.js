import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQ, fetchToken } from '../services/API';
import { clickLogin, questionsGen } from '../actions';

import SettingsButton from '../Components/SettingsButton';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      validate: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validInputs = this.validInputs.bind(this);
    this.login = this.login.bind(this);
  }

  validInputs() {
    const { email, name } = this.state;
    const minNumber = 0;
    if (email.match(/\S+@\S+\.\S+/) && name.length > minNumber) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validInputs);
  }

  async login() {
    const { email, name } = this.state;
    const { texts, questionsGenerator, history } = this.props;
    texts(email, name);
    fetchToken();
    const questionsList = await fetchQ();
    questionsGenerator(questionsList);
    setTimeout(() => {
      history.push('/questions-page');
    }, 5000);
  }

  render() {
    const { validate, email, name } = this.state;
    return (
      <div>
        <SettingsButton />
        <form>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              id="email"
              placeholder="E-Mail"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="name">
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              value={ name }
              id="name"
              placeholder="Nome"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ validate }
            onClick={ this.login }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  texts: (email, name) => dispatch(clickLogin({ email, name })),
  questionsGenerator: (questionsList) => dispatch(questionsGen({ questionsList })),
});

Login.propTypes = {
  texts: PropTypes.func.isRequired,
  questionsGenerator: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
