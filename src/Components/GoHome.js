import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class GoHome extends Component {
  constructor() {
    super();
    this.click = this.click.bind(this);
  }

  click() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.click }
        >
          Início
        </button>
      </div>
    );
  }
}

GoHome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

export default GoHome;
