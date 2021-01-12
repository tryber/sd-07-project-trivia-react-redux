import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStorage } from '../services/localStorage';
import CustomLogin from '../components/Customlogin';
import addEmail from '../actions';
import fetchToken from '../actions/fetchToken';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      permitir: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validaInput = this.validaInput.bind(this);
  }

  validaInput() {
    const { email, nome } = this.state;
    const number = 5;
    if (email.match(/\S+@\S+\.\S+/) && nome.length > number) {
      this.setState({ permitir: false });
    } else {
      this.setState({ permitir: true });
    }
  }

  async handleSubmit() {
    const { add, dispatchToken } = this.props;
    const { email } = this.state;
    add(email);
    await dispatchToken(setStorage);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validaInput);
    // validaInput é chamada assim que o estado se atualiza
    // ou seja , a cada momento que o onchange é modificado
  }

  render() {
    const { permitir } = this.state;
    return (
      <CustomLogin
        onInputChange={ this.handleInputChange }
        onHandleSubmit={ this.handleSubmit }
        validate={ permitir }
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (e) => dispatch(addEmail(e)),
  dispatchToken: (callback) => dispatch(fetchToken(callback)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  add: PropTypes.func.isRequired,
  dispatchToken: PropTypes.func.isRequired,
};
