import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div className="feedback-screen">
        <div className="feedback-header">
          <Header />
        </div>
        <div data-testid="feedback-text">
          Text
        </div>
        <button
          onClick={ this.handleClick }
          data-testid="btn-ranking"
          type="button"
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
