import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUserLogin } from '../actions';

class FormLogin extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(name, email) {
    const { setUser } = this.props;
    setUser(name, email);
  }

  render() {
    const { name, email } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="text"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          onClick={ () => this.handleClick(name, email) }
          disabled={ name.length === 0 || email.length === 0 }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (name, email) => dispatch(setUserLogin(name, email)),
});

FormLogin.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FormLogin);
