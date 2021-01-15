import React, { Component } from 'react';
import '../css/Ranking.css';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.goToLogin = this.goToLogin.bind(this);
  }

  goToLogin() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">RANKING SCREEN</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goToLogin }
        >
          JOGAR NOVAMENTE
        </button>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
