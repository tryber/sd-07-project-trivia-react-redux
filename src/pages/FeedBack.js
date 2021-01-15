import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class FeedBack extends Component {
  constructor() {
    super();
    this.handleRedirectHome = this.handleRedirectHome.bind(this);
    this.handleRedirectRanking = this.handleRedirectRanking.bind(this);
  }

  handleRedirectHome() {
    const { history } = this.props;
    history.push('/');
  }

  handleRedirectRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div>
        <Header />
        feedback
        <p data-testid="feedback-text"> voce é top</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleRedirectHome }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleRedirectRanking }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

FeedBack.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
