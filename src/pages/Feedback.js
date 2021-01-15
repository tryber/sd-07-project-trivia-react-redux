import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const goodMessage = <p data-testid="feedback-text">Podia ser melhor...</p>;
    const badMessage = <p data-testid="feedback-text">Mandou bem!</p>;
    const two = 2;
    return (
      <div>
        <h1>FeedBack</h1>
        <Header />
        <Link to="/ranking">
          <button
            type="button"
            data-testiid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        { assertions > two ? badMessage : goodMessage }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.userReducer.assertions,
});

export default connect(mapStateToProps)(Feedback);
