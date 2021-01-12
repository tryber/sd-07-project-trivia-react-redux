import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormLogin from '../components/FormLogin';
import { fetchTokenAction } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateImputs = this.validateImputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  validateImputs() {
    const { email, name } = this.state;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValidator.test(email) && name.length) {
      return false;
    }
    return true;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { fetchTokenActionProps } = this.props;
    await fetchTokenActionProps();
    const { token, history } = this.props;
    const { payload } = token;
    localStorage.setItem('token', JSON.stringify(payload));
    history.push('/game');
  }

  handleSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    return (
      <FormLogin
        handleChange={ this.handleChange }
        validateImputs={ this.validateImputs }
        handleClick={ this.handleClick }
        handleSettings={ this.handleSettings }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTokenActionProps: () => dispatch(fetchTokenAction()),
}
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  fetchTokenActionProps: PropTypes.func.isRequired,
  token: PropTypes.shape({
    payload: PropTypes.shape({
      response_code: PropTypes.number,
      response_message: PropTypes.string,
      token: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
