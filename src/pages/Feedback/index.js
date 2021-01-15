import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, FeedbackMessage } from '../../components';

const Feedback = ({ score, assertions }) => (
  <div>
    <header>
      <Header />
    </header>
    <h1>Tela de Feedback</h1>
    <FeedbackMessage score={ score } assertions={ assertions } />
    <Link to="/">
      <button type="button" data-testid="btn-play-again">Jogar novamente</button>
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
