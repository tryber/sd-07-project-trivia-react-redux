import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class GoRanking extends Component {
  constructor() {
    super();
    this.click = this.click.bind(this);
  }

  click() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.click }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

GoRanking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

export default GoRanking;
