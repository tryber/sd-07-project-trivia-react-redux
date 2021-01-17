import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CustomHeader, CustomPlayAgain } from '../components';

function FeedBack({ history: { push }, name, email, score, assertions }) {
  const tree = 3;
  return (
    <div>
      <CustomHeader name={ name } email={ email } score={ score } />
      <h1 data-testid="feedback-text">FeedBack</h1>
      {
        assertions < tree
          ? (<h2 data-testid="feedback-text">Podia ser melhor...</h2>)
          : (<h2 data-testid="feedback-text">Mandou bem!</h2>)
      }
      <h3 data-testid="feedback-total-score">{ score }</h3>
      <h3 data-testid="feedback-total-question">{ assertions }</h3>
      <CustomPlayAgain push={ push } />
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ () => { push('/ranking'); } }
      >
        Rankinggg!!!!!!
      </button>
    </div>
  );
}

const mapStateToProps = ({
  loginReducer: { name, email },
  playerReducer: { score, assertions },
}) => ({
  name,
  email,
  score,
  assertions,
});

export default connect(mapStateToProps)(FeedBack);

FeedBack.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
