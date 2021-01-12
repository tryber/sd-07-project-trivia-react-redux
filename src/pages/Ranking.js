import React from 'react';
import PropTypes from 'prop-types';
/* import { connect } from 'react-redux'; */

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  goHome() {
    const { history } = this.props;
    history.push('./login');
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ (event) => this.goHome(event) }
        >
          Voltar
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
