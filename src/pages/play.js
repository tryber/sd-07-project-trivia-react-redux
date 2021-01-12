import React, { Component } from 'react';
import { connect } from 'react-redux';

class Play extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Bem vindo a página Play!</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

export default connect(mapStateToProps)(Play);
