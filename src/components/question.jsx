import React, { Component } from 'react';
import { connect } from 'react-redux';
import './question.css';
import PropTypes from 'prop-types';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: false,
      markAnswers: false,
      counter: 30,
    };
    this.timeQuestion = this.timeQuestion.bind(this);
    this.disableButton = this.disableButton.bind(this);
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
        onClick={ () => { this.setState({ markAnswers: true }); } }
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
        onClick={ () => { this.setState({ markAnswers: true }); } }
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
