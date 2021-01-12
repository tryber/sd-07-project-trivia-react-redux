import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clickLogin } from '../actions';

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
    this.textsToProps = this.textsToProps.bind(this);
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

  textsToProps() {
    const { email, name } = this.state;
    const { texts } = this.props;
    texts(email, name);
  }

  render() {
    const { validate, email, name } = this.state;
    return (
      <div>
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
            onClick={ this.textsToProps }
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
});

Login.propTypes = {
  texts: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
