import React, { Component } from 'react';
import { CustomLogin } from '../components';
import { connect } from 'react-redux';
import { addEmail } from '../actions';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      permitir: true
  };
this.handleInputChange = this.handleInputChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
this.validaInput = this.validaInput.bind(this)


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

  handleSubmit() {
    const { add } = this.props
    add(this.state.email)
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validaInput);
    // validaInput é chamada assim que o estado se atualiza
    // ou seja , a cada momento que o onchange é modificado
  };

  render() {
    return (
      <CustomLogin
        formData={this.state}
        onInputChange={this.handleInputChange}
        onHandleSubmit={this.handleSubmit}
        validate={this.state.permitir}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (e) => dispatch(addEmail(e)),
});

export default connect(null, mapDispatchToProps)(Login);
