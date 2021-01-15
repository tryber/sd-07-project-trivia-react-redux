import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userActions, fetchApi } from '../../actions';
import { LoginForm } from '../../components';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '',
      email: '',
      auth: false,
    };
  }

  handleChange({ target }) {
    const { email, name } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validation = !!(regex.test(email) && name);

    this.setState({ [target.id]: target.value, auth: validation });
  }

  async handleClick() {
    const { callApi, newPlyr } = this.props;
    const { name, email } = this.state;
    const endpoint = await fetch('https://opentdb.com/api_token.php?command=request');
    const objct = await endpoint.json();

    localStorage.setItem('token', objct.token);
    callApi();
    newPlyr(name, email);
  }

  render() {
    const { name, email, auth } = this.state;

    return (
      <div>
        <LoginForm
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          name={ name }
          email={ email }
          auth={ auth }
        />
        <Link to="/config">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  callApi: () => dispatch(fetchApi()),
  newPlyr: (name, email) => dispatch(userActions.newPlayer(name, email)),
});

export default connect(null, mapDispatchToProps)(Home);

Home.propTypes = {
  callApi: PropTypes.func.isRequired,
  newPlyr: PropTypes.func.isRequired,
};
