import React from 'react';
import PropTypes from 'prop-types';

class RankingButton extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ history.push('/ranking') }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

RankingButton.propTypes = {
  history: PropTypes.string.isRequired,
};

export default RankingButton;
