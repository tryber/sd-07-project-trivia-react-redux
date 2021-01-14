import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Quiz from '../components/Quiz';

class Game extends Component {
  constructor(props) {
    super(props);
    // const { results } = this.props;
    this.state = {
      key: 0,
      //  results: results,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    const { key } = this.state;
    const { history } = this.props;
    const numberQuestion = 4;
    if (key === numberQuestion) {
      console.log('chegou');
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
      return <p>Carregando</p>;
    }
    // setTimeout(() => console.log(results), 2000);
    return (
      <div>
        <Header />
        <Quiz nextQuestion={ this.nextQuestion } results={ results[key] } />
      </div>
    );
  }
}
const mapStateToProps = ({
  game: {
    isLoading,
    questions: { results },
  },
}) => ({
  isLoading,
  results,
});
export default connect(mapStateToProps)(Game);
Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};
