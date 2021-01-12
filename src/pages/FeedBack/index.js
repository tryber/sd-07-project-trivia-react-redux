import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components';

class FeedBack extends Component {
  render() {
    const { assertions } = this.props;
    const threeAssertions = 3;
    return (
      <div>
        <Header />
        <p data-testid="feddback-text">
          { assertions >= threeAssertions
            ? 'Mandou bem!'
            : 'Podia ser melhor...'}
        </p>
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default FeedBack;
