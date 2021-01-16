import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateRanking } from '../actions/index';
import Header from '../components';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.handleAssertions = this.handleAssertions.bind(this);
    this.handleTotalQuestions = this.handleTotalQuestions.bind(this);
    this.updateRank = this.updateRank.bind(this);
    this.updateLocalStorageRank = this.updateLocalStorageRank.bind(this);

    this.state = {
      redirect: '',
    };
  }

  async componentDidMount() {
    await this.updateRank();
    this.updateLocalStorageRank();
  }

  updateRank() {
    const { name, email, points, addRank } = this.props;
    const newRank = {
      name,
      score: points,
      picture: email,
    };
    addRank(newRank);
  }

  updateLocalStorageRank() {
    const { ranking } = this.props;
    const retorno = 1;
    function compare(a, b) {
      if (a.score < b.score) {
        return retorno;
      }

      if (a.score > b.score) {
        return -retorno;
      }
      return 0;
    }
    ranking.sort(compare);
    const savedRanking = JSON.stringify(ranking);
    localStorage.setItem('ranking', savedRanking);
  }

  handleTotalQuestions() {
    const { assertions } = this.props;

    return (
      <p data-testid="feedback-total-question">
        {assertions}
      </p>
    );
  }

  handleAssertions() {
    const { assertions } = this.props;
    const lowScore = 3;

    if (assertions < lowScore) {
      return <h2 data-testid="feedback-text">Podia ser melhor...</h2>;
    }
    return <h2 data-testid="feedback-text">Mandou bem!</h2>;
  }

  render() {
    const { points, history } = this.props;
    const { redirect } = this.state;

    return (
      <div>
        <Header />
        <main className="feedback">
          {this.handleAssertions()}
          {this.handleTotalQuestions()}
          <h2 data-testid="feedback-total-score">
            {points}
          </h2>
          <div className="feedback-btn-container">
            <button
              data-testid="btn-ranking"
              type="button"
              onClick={ () => history.push('/ranking') }
            >
             Ver ranking
            </button>
            <button
              data-testid="btn-play-again"
              type="button"
              onClick={ () => {
                this.setState({ redirect: <Redirect path="/play" /> });
              } }
            >
              Jogar novamente
            </button>
          </div>
          { redirect }
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.token.assertions,
  points: state.token.points,
  name: state.token.name,
  email: state.token.email,
  ranking: state.token.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  addRank: (value) => dispatch(updateRanking(value)),
});

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
  ranking: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addRank: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
