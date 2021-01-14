import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class FeedBack extends Component {
  constructor() {
    super();
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect() {
    const { history } = this.props;
    history.push('/');
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
          onClick={ this.handleRedirect }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

FeedBack.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
