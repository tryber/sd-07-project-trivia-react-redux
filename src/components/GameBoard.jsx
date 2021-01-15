import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../action';
import Question from './Question';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      nextQuestion: true,
    };

    this.onClickHandlerNext = this.onClickHandlerNext.bind(this);
    this.onClickQuestion = this.onClickQuestion.bind(this);
  }

  componentDidMount() {
    const { token, getQuestionsDispatch } = this.props;
    getQuestionsDispatch(token);
  }

  onClickQuestion() {
    this.setState({
      nextQuestion: false,
    });
  }

  onClickHandlerNext() {
    this.setState((state) => {
      const { currentQuestion } = state;
      return { currentQuestion: currentQuestion + 1 };
    });

    this.setState({
      nextQuestion: true,
    });
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, nextQuestion } = this.state;

    if (questions.length > 0) {
      return (
        <div>
          <h1>
            Vamos Jogar!
          </h1>
          <p>
            <Question
              questionProp={ questions[currentQuestion] }
              onClickHandler={ this.onClickHandlerNext }
              onClickQuestion={ this.onClickQuestion }
              enable={ nextQuestion }
            />
          </p>
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
