import React from 'react';
/* import PropTypes from 'prop-types'; */
/* import { Link } from 'react-router-dom'; */
import { connect } from 'react-redux';
/* import { login } from '../actions'; */

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      emailInput: '',
      nameInput: '',
      disabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableButton());
  }

  enableButton() {
    const { emailInput, nameInput } = this.state;
    if (nameInput && emailInput) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { emailInput, nameInput, disabled } = this.state;
    /* const { email } = this.props; */

    return (
      <div>
        <input
          id="nameInput"
          name="nameInput"
          type="text"
          value={ nameInput }
          data-testid="input-player-name"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          id="emailInput"
          name="emailInput"
          type="email"
          value={ emailInput }
          data-testid="input-gravatar-email"
          onChange={ (event) => this.handleChange(event) }
        />
        <button
          type="button"
          disabled={ disabled }
          data-testid="btn-play"
          /* onClick={ () => email(emailInput) } */
        >
          Jogar
        </button>
      </div>
    );
  }
}

/* const mapDispatchToProps = (dispatch) => ({
  email: (value) => dispatch(login(value)),
}); */

/* Login.propTypes = {
  email: PropTypes.func.isRequired,
};
 */

export default Login;
/* export default connect(null, mapDispatchToProps)(Login); */
