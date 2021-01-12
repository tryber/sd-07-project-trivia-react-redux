import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStorage } from '../services/localStorage';
import CustomLogin from '../components/Customlogin';
import { addEmail, fetchToken, addName } from '../actions';

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
    const { dispatchEmail, dispatchToken, dispatchNome } = this.props;
    const { email, nome} = this.state;
    dispatchEmail(email);
    dispatchNome(nome);
    console.log(nome , email)
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
  dispatchEmail: (e) => dispatch(addEmail(e)),
  dispatchNome: (e) => dispatch(addName(e)),
  dispatchToken: (callback) => dispatch(fetchToken(callback)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
  dispatchNome: PropTypes.func.isRequired,
  dispatchToken: PropTypes.func.isRequired,
};
