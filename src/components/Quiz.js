import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Quiz.css';
import Timer from './Timer';
import { scoreUpdate } from '../redux/actions';

class Quiz extends Component {
  constructor() {
    super();

    this.state = {
      answered: false,
      colorCorrect: '',
      colorIncorrect: '',
      resetTimer: false,
    };

    this.answerColor = this.answerColor.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.restoreTimer = this.restoreTimer.bind(this);
  }

  handleClick() {
    this.setState({
      answered: true,
    });
  }

  answerColor() {
    // const { results } = this.props;
    // const { correct_answer: correctAnswer } = results;

    // if (target.innerText !== correctAnswer) {
    // }

    this.setState({
      colorIncorrect: 'answer-wrong',
      colorCorrect: 'answer-correct',
    });

    this.handleClick();
  }

  nextButton() {
    this.setState({
      answered: false,
      colorCorrect: '',
      colorIncorrect: '',
      resetTimer: true,
    });
  }

  restoreTimer() {
    this.setState({
      resetTimer: false,
    });
  }

  render() {
    const { answered, colorCorrect, colorIncorrect, resetTimer } = this.state;
    const { results, nextQuestion, updateScore } = this.props;
    const { correct_answer: correctAnswer } = results;
    const { incorrect_answers: incorrectAnswers } = results;
    const { question, category, difficulty } = results;
    const allQuestions = [correctAnswer, ...incorrectAnswers];
    const magicNumber = 0.5;
    const magicNumberTwo = 5;
    const allIndex = allQuestions
      .map((anyQuestion) => allQuestions
        .indexOf(anyQuestion))
      .sort(() => Math.random() - magicNumber);
    const shuffledArray = allIndex.map((shuffledNumber) => allQuestions[shuffledNumber]);
    const renderQuestions = (questionToRender, number) => {
      if (questionToRender === correctAnswer) {
        return (
          <button
            className={ colorCorrect }
            key={ number }
            data-testid="correct-answer"
            type="button"
            onClick={ () => { this.answerColor(); updateScore(magicNumberTwo); } }
            disabled={ answered }
          >
            { correctAnswer }
          </button>);
      }
      return (
        <button
          className={ colorIncorrect }
          key={ number }
          data-testid={ `wrong-answer-${number}` }
          type="button"
          onClick={ this.answerColor }
          disabled={ answered }
        >
          { questionToRender }
        </button>);
    };
    return (
      <div>
        <div>
          <p data-testid="question-text">{ question }</p>
          <p>{ difficulty }</p>
          <p data-testid="question-category">{ category }</p>
          {shuffledArray.map((oneQuestion, index) => renderQuestions(oneQuestion, index))}
          <button
            type="button"
            onClick={ () => { this.nextButton(); nextQuestion(); } }
            hidden={ !answered }
            data-testid="btn-next"
          >
            Próxima
          </button>
        </div>
        <Timer
          answerColor={ this.answerColor }
          nextButton={ this.nextButton }
          resetTimer={ resetTimer }
          restoreTimer={ this.restoreTimer }
        />
      </div>
    );
  }
}

// const mapStateToProps = ({ player: { score, assertions }})
const mapDispatchToProps = (dispatch) => ({
  updateScore: (info) => dispatch(scoreUpdate(info)),
});

export default connect(null, mapDispatchToProps)(Quiz);

Quiz.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
};
