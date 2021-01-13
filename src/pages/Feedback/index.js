import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const sufficientAssertion = 3;
    return (
      <div>
        {
          assertions < sufficientAssertion
            ? (<p data-testid="feedback-text">Podia ser melhor...</p>)
            : (<p data-testid="feedback-text">Mandou bem!</p>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
