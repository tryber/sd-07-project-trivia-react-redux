import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import propTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();

    this.state = { redirect: false };

    this.toLogin = this.toLogin.bind(this);
  }

  toLogin() {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return (<Redirect to="/" />);
    // incluir array.map() para gerar os itens da lista <ul />
    // componente 'RankingItem' criado para renderizar os itens da lista
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul />
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.toLogin }
        >
          Jogar novamente!
        </button>
      </div>
    );
  }
}

export default Ranking;
