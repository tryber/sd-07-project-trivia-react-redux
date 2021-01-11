import React from 'react';
import { Link } from 'react-router-dom';
import FormLogin from '../Components/FormLogin';

class Login extends React.Component {
  render() {
    return (
      <>
        <Link
          to="/settings"
          data-testid="btn-settings"
        >
          Configurações
        </Link>
        <FormLogin />
      </>
    );
  }
}

export default Login;
