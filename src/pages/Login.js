import React, { Component } from 'react';
import { CustomLogin } from '../components';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
  };
this.handleInputChange = this.handleInputChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)

} 
  
  handleSubmit = () => {};

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <CustomLogin
        formData={this.state}
        onInputChange={this.handleInputChange}
        onHandleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addRegister: (e) => dispatch(addRegister(e)),
});

export default connect(null, mapDispatchToProps)(Login);
