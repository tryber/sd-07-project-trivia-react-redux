import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Quiz from '../components/Quiz';
import { resetScore } from '../redux/actions';

class Game extends Component {
  constructor(props) {
    super(props);
    // const { results } = this.props;
    this.state = {
      key: 0,
      //  results: results,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.createLocalStorage = this.createLocalStorage.bind(this);
  }

  componentDidMount() {
    this.createLocalStorage();
  }

  createLocalStorage() {
    const { name, gravatarEmail, resetScoreAssertion } = this.props;
    resetScoreAssertion();
    const playerObj = { player: { name, assertions: 0, score: 0, gravatarEmail } };
    localStorage.setItem('state', JSON.stringify(playerObj));
  }

  nextQuestion() {
    const { key } = this.state;
    const { history } = this.props;
    const numberQuestion = 4;
    if (key === numberQuestion) {
      history.push('/feedback');
    } if (key < numberQuestion) {
      this.setState({
        key: key + 1,
      });
    }
  }

  render() {
    const { key } = this.state;
    const { results, isLoading } = this.props;
    if (isLoading || results === undefined) {
      return <p className="loader" />;
    }

    return (
      <div>
        <Header />
        <Quiz
          nextQuestion={ this.nextQuestion }
          results={ results[key] }
        />
      </div>
    );
  }
}
const mapStateToProps = ({
  game: {
    isLoading,
    questions: { results },
  },
  player: {
    name,
    assertions,
    score,
    gravatarEmail,
  },
}) => ({
  isLoading,
  results,
  name,
  assertions,
  score,
  gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  resetScoreAssertion: (info) => dispatch(resetScore(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  resetScoreAssertion: PropTypes.func.isRequired,
};
