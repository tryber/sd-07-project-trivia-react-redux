import React from 'react';
import PropTypes from 'prop-types';

class NextButton extends React.Component {
  render() {
    const { onclick, className } = this.props;
    return (
      <div>
        <br />
        <button
          className={ className }
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
  className: PropTypes.string.isRequired,
};

export default NextButton;
