import React from 'react';
import Header from '../components';
import { connect } from 'react-redux';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.handleAssertions = this.handleAssertions.bind(this);
  }

  handleAssertions() {
    const { assertions } = this.props;

    if (assertions < 3) {
      return <h2 data-testid="feedback-text">Podia ser melhor...</h2>
    }
    return <h2 data-testid="feedback-text">Mandou bem!</h2>
  }

  render() {
    const { assertions, points, history } = this.props;

    return (
      <div>
        <Header />
        <main>
          { this.handleAssertions() }
          {
            assertions > 0 ? <h2>Você acertou <span data-testid="feedback-total-question">{ assertions }</span> questões!</h2> : <h2 data-testid="feedback-total-question">Não acertou nenhuma pergunta</h2>
          }
          <h2 data-testid="feedback-total-score">Um total de {points} pontos</h2>

          <button data-testid="btn-ranking" type="button">Ver ranking</button>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.token.assertions,
  points: state.token.points,
});

export default connect(mapStateToProps)(FeedBack);
