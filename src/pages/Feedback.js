import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.renderFeedback = this.renderFeedback.bind(this);
    this.renderTotalAnswer = this.renderTotalAnswer.bind(this);
    this.renderTotalScore = this.renderTotalScore.bind(this);
  }

  renderFeedback() {
    const three = 3;
    const { realAssertions } = this.props;
    if (realAssertions < three) {
      return <h1 data-testid="feedback-text">Podia ser melhor...</h1>;
    }
    return <h1 data-testid="feedback-text">Mandou bem!</h1>;
  }

  renderTotalAnswer() {
    const { realAssertions } = this.props;
    if (realAssertions === 0) {
      return <h2 data-testid="feedback-total-question">Não acertou nenhuma pergunta</h2>;
    }
    return (
      <h2>
        <span
          data-testid="feedback-total-question"
        >
          {`Você acertou ${realAssertions} questões!`}
        </span>
      </h2>
    );
  }

  renderTotalScore() {
    const { realScore } = this.props;
    return (
      <h2>
        <span
          data-testid="feedback-total-score"
        >
          {`Um total de ${realScore} pontos`}
        </span>
      </h2>
    );
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <div>
          {this.renderFeedback()}
          {this.renderTotalAnswer()}
          {this.renderTotalScore()}
        </div>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  realScore: state.score.points,
  realAssertions: state.score.assertions,
});

Feedback.propTypes = {
  realAssertions: PropTypes.number.isRequired,
  realScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
