import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FeedbackMSG extends Component {
  render() {
    const { assertions } = this.props;
    const msg1 = 'Podia ser melhor...';
    const msg2 = 'Mandou bem!';
    const tres = 3;
    return (
      <h1 data-testid="feedback-text">
        { assertions < tres ? msg1 : msg2 }
        {' '}
      </h1>
    );
  }
}

export default FeedbackMSG;

FeedbackMSG.propTypes = {
  assertions: PropTypes.number.isRequired,
};
