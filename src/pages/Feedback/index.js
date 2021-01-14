import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import './index.css';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const sufficientAssertion = 3;
    console.log(assertions);
    return (
      <main className="wrapper">
        <Header />
        <div className="feedback__container">
          <div className="feedback__content">
            <p className="feedback__result" data-testid="feedback-text">
              {
                assertions < sufficientAssertion
                  ? ('Podia ser melhor...')
                  : ('Mandou bem!')
              }
            </p>
          </div>
        </div>
      </main>
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
