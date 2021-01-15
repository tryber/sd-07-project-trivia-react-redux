import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { redirect } from '../actions';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(assertions) {
    const parameter = 3;
    if (assertions >= parameter) {
      return (<h1 data-testid="feedback-text">Mandou bem!</h1>);
    }
    return (<h1 data-testid="feedback-text">Podia ser melhor...</h1>);
  }

  render() {
    const { score, assertions, inFeedback } = this.props;
    inFeedback('inFeedback');
    return (
      <div>
        <Header />
        { this.renderMessage(assertions) }
        <div className="score-questions-container">
          <h3 data-testid="feedback-total-quesiton">
            { `Você acertou ${assertions} questões!` }
          </h3>
          <h3 data-testid="feedback-total-score">
            { `Um total de ${score} pontos!` }
          </h3>
        </div>
        <div className="btn-container">
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ver Ranking
            </button>Main group 16 req19 20 21
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  inFeedback: (string) => dispatch(redirect(string)),
});

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  src: propTypes.string,
  name: propTypes.string,
  score: propTypes.number,
  assertions: propTypes.number,
}.isRequired;
