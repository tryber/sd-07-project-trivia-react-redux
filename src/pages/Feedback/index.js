import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, FeedbackMessage, HomeButton } from '../../components';

const Feedback = ({ score, assertions }) => (
  <div>
    <Header />
    <h1>Tela de Feedback</h1>
    <FeedbackMessage score={ score } assertions={ assertions } />
    <HomeButton test="btn-play-again" />
    <Link to="/ranking">
      <button type="button" data-testid="btn-ranking">Ver Ranking</button>
    </Link>
  </div>
);

const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
  score: state.game.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
