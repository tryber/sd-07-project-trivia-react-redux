import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      emaiOk: false,
      buttonDisable: true,
    }

    this.handleInputs = this.handleInputs.bind(this);
  }

  handleInputs({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value })
    const { email } = this.state;
    const validacaoByStackOf = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
    const matchEmail = email.match(validacaoByStackOf);
    matchEmail ? this.setState({ emaiOk: true }) : this.setState({ emaiOk: false })
    if(this.state.name && this.state.emaiOk) {
      this.setState({ buttonDisable: false })
    }
  }

  render() {
    return(
      <div> 
        <form>
          <input type="text" name="name" placeholder="Nick" data-testid="input-player-name" onChange={ this.handleInputs } />
          <input type="text" name="email" placeholder="email" data-testid="input-gravatar-email" onChange={ this.handleInputs } />
          <button data-testid="btn-play" disabled={ this.state.buttonDisable }>Jogar</button>
        </form>
      </div>
    )
  }
}

export default Login;
