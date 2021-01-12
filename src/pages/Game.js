import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { results, isLoading } = this.props;
    if (isLoading) {
      return (
        <p>Carregando</p>
      );
    }

    // setTimeout(() => console.log(results), 2000);

    return (
      <div>
        <Header />
        <p data-testid="question-category"> Category:</p>
        {console.log(results)}
      </div>
    );
  }
}

const mapStateToProps = ({ game: { isLoading, questions: { results } } }) => ({
  isLoading,
  results,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  results: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
