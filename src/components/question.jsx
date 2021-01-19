import React, { Component } from 'react';
import { connect } from 'react-redux';
import './question.css';
import PropTypes from 'prop-types';

class Question extends Component {
  constructor(props) {
    super(props);
    const { questions, questionSelected } = props;
    const question = questions[questionSelected];
    this.state = {
      btnDisabled: false,
      markAnswers: false,
      counter: 30,
      question,
    };
    this.timeQuestion = this.timeQuestion.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  componentDidMount() {
    const interval = 1000;
    this.intervalSeconds = setInterval(this.timeQuestion, interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalSeconds);
  }

  disableButton(bool) {
    this.setState({ btnDisabled: bool });
    this.setState({ markAnswers: true });
  }

  timeQuestion() {
    const { counter } = this.state;
    if (counter < 1) {
      clearInterval(this.intervalSeconds);
      this.disableButton(true);
    } else {
      this.setState({
        counter: counter - 1,
      });
    }
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  answerQuestion(bool) {
    const { counter, question } = this.state;
    this.setState({ markAnswers: true });
    if (bool) {
      let difficulty = 0;
      const mnum = 3;
      switch (question.difficulty) {
      case 'medium':
        difficulty = 2;
        break;
      case 'easy':
        difficulty = 1;
        break;
      case 'hard':
        difficulty = mnum;
        break;
      default:
        break;
      }
      const mn = 10;
      const gottenState = JSON.parse(localStorage.getItem('state'));
      localStorage.setItem('state', JSON.stringify({ player:
        { score: gottenState.player.score + mn + (counter * difficulty),
          ...gottenState.store } }));
    }
  }

  render() {
    const { btnDisabled, markAnswers, counter } = this.state;
    const { questions, questionSelected } = this.props;
    const question = questions[questionSelected];
    const arr = question.incorrect_answers.map((answer, index) => (
      <button
        disabled={ btnDisabled }
        type="button"
        key={ answer }
        className={ markAnswers && 'wrong-answer' }
        data-testid={ `wrong-answer-${index}` }
        onClick={ () => { this.answerQuestion(false); } }
      >
        { answer }
      </button>));
    arr.push((
      <button
        disabled={ btnDisabled }
        type="button"
        key={ question.correct_answer }
        className={ markAnswers && 'correct-answer' }
        data-testid="correct-answer"
        onClick={ () => { this.answerQuestion(true); } }
      >
        {question.correct_answer}
      </button>));
    return (
      <div>
        <section>
          <h2 data-testid="question-category">{question.category}</h2>
          <p data-testid="question-text">{question.question}</p>
          {arr.map((element) => element)}
        </section>
        <section>
          <p>
            Tempo:
            { counter }
          </p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  questionSelected: state.trivia.questionIndex,
});

Question.propTypes = {
  questions: PropTypes.objectOf.isRequired,
  questionSelected: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Question);
