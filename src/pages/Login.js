import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.valida = this.valida.bind(this);

    this.state = {
      name:'',
      email:'',
    };
  }
  handleChange(e){
    const { value, type } = e.target;
    this.setState({ [type]:value });
  };
  valida(){
    // eslint-disable-next-line
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const { email, name } = this.state;
    if(name.length < 1) {
      if (pattern.test(email)) {
        return false;
      }
    }
    return true;
  }
  render(){
    return(
      <form>
        <label
          htmlFor='name'
        >
          Name:
          <input
            name='name'
            type='name'
            data-testid='input-player-name'
            onChange={this.handleChange}
          />
        </label>
        <label
          htmlFor='email'
        >
          Email:
          <input
            name='email'
            type='email'
            data-testid='input-gravatar-email'
            onChange={this.handleChange}
          />
        </label>
        <button
          disabled={this.valida()}
        >
          Jogar
        </button>
      </form>
    )
  }
}

export default Login;