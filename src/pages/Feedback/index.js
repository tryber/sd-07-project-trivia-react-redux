import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from '../../components';

class Feedback extends Component {
  render() {
    const RULE_ASSERTIONS = 3;
    const { assertions } = this.props;
    const message = assertions >= RULE_ASSERTIONS ? 'Mandou bem!' : 'Podia ser melhor...';

    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">{message}</h1>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.user.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
