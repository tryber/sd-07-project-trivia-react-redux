import React from 'react';
import PropTypes from 'prop-types';

export default class CustomButton extends React.component {
  render() {
    const { history, route = '/', testid, value } = this.props;
    return (
      <button
        type="button"
        data-testid={ testid }
        onClick={ () => { history.push(route); } }
      >
        {value}
      </button>
    );
  }
}
CustomButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
