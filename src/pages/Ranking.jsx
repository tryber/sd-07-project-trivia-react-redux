import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAcertos: 0,
      message: '',
    };
  }

  componentDidMount() {
    this.setMessage();
  }

  setMessage() {
    const { nroAcertos } = this.props;
    const minimoAcerto = 3;
    if (nroAcertos < minimoAcerto) {
      this.setState({ message: 'Podia ser melhor...' });
    } else {
      this.setState({ message: 'Mandou bem!' });
    }
    this.setState({ totalAcertos: nroAcertos });
  }

  render() {
    const { message, totalAcertos } = this.state;
    const getRankingSaved = JSON.parse(localStorage.getItem('ranking'));
    const toOrdenate = (a, b) => {
      const falseNegative = -1;
      const truePositive = 1;
      if (a.score > b.score) return falseNegative;
      if (a.score < b.score) return truePositive;
      return 0;
    };
    console.log(this.props);
    getRankingSaved.sort(toOrdenate);
    // const getStateSaved = JSON.parse(localStorage.getItem('state'));
    const { score } = this.props;
    const scoreLogado = score;
    return (
      <div>
        <Header />
        <p data-testid="">{ message }</p>
        <p data-testid="">
          <span>Sua pontuacao: </span>
          {scoreLogado}
        </p>
        <p data-testid="">
          <span>Número de Acertos: </span>
          { totalAcertos }
        </p>
        <h1 data-testid="ranking-title">Ranking</h1>
        {getRankingSaved.map((element, index) => {
          const { name, scoreSaved, picture } = element;
          return (
            <div key={ index }>
              <ul>
                <li>
                  <img src={ picture } alt="Gravatar" />
                  {' Nome: '}
                  <span data-testid={ `player-name-${index}` }>
                    {`${name} -`}
                  </span>
                  {' score: '}
                  <span data-testid={ `player-score-${index}` }>
                    {scoreSaved}
                  </span>
                </li>
              </ul>
            </div>
          );
        })}
        <Link to="/" data-testid="btn-go-home">
          <button type="button">Login</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nroAcertos: state.timer.acertos,
  score: state.player.score,
});

Ranking.propTypes = {
  nroAcertos: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Ranking);
