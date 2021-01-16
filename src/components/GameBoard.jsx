import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../Redux/actions';
import Question from './Question';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      nextButton: false,
    };

    this.onClickNext = this.onClickNext.bind(this);
    this.onClickQuestion = this.onClickQuestion.bind(this);
  }

  componentDidMount() {
    const { token, getQuestionsDispatch } = this.props;
    getQuestionsDispatch(token);
  }

  onClickQuestion() {
    this.setState({
      nextButton: true,
    });
  }

  onClickNext() {
    const { questions } = this.props;
    const { currentQuestion } = this.state;

    if (currentQuestion < questions.length - 1) {
      this.setState((state) => ({
        currentQuestion: state.currentQuestion + 1,
      }), () => this.setState({ nextButton: false }));
    }
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, nextButton } = this.state;

    if (questions.length > 0) {
      return (
        <div>
          <h1>
            Vamos Jogar!
          </h1>
          <Question
            currentQuestion={ questions[currentQuestion] }
            onClickNext={ this.onClickNext }
            onClickQuestion={ this.onClickQuestion }
            nextButtonVisible={ nextButton }
          />
        </div>
      );
    }

    return <p>Carregando...</p>;
  }
}

const mapStateToProps = (state) => ({
  token: state.userReducer.user.token,
  questions: state.gameReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionsDispatch: (token) => dispatch(getQuestions(token)),
});

GameBoard.propTypes = {
  token: PropTypes.string.isRequired,
  getQuestionsDispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
