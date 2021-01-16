import React from 'react';
import PropTypes from 'prop-types';

class NextButton extends React.Component {
  render() {
    const { onclick } = this.props;
    return (
      <div>
        <br />
        <button
          type="button"
          data-testid="btn-next"
          onClick={ onclick }
        >
          Próxima
        </button>
      </div>
    );
  }
}

NextButton.propTypes = {
  onclick: PropTypes.func.isRequired,
};

export default NextButton;
