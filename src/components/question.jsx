import React, { Component } from 'react';
import { connect } from 'react-redux';
import './question.css';
import PropTypes from 'prop-types';
import QuestionTimer from './questionTimer';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: false,
      markAnswers: false,
    };
    this.shuffle = this.shuffle.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  disableButton(bool) {
    this.setState({ btnDisabled: bool });
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    const { btnDisabled, markAnswers } = this.state;
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
          {this.shuffle(arr).map((element) => element)}
        </section>
        <section>
          <QuestionTimer disableButton={ this.disableButton } />
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
