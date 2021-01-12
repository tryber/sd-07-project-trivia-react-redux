import React, { Component } from 'react';
import * as triviaAPI from '../../services/triviaAPI';

import CorrectAnswer from './CorrectAnswer';
import WrongAnswer from './WrongAnswer';

class Questions extends Component {
  constructor() {
    super();
    this.fetchTriviaAPI = this.fetchTriviaAPI.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.randomizeAnswers = this.randomizeAnswers.bind(this);

    this.state = {
      questions: [],
      currentQuestion: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchTriviaAPI();
  }

  async fetchTriviaAPI() {
    const quantityOfQuestions = 5;
    const token = localStorage.getItem('token');
    const requestQuestions = await triviaAPI.getQuestions(quantityOfQuestions, token);
    this.setState({
      questions: requestQuestions.results,
      isLoading: false,
    });
  }

  // shuffleArray from https://stackoverflow.com/a/12646864
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  randomizeAnswers(lenth) {
    const array = [];
    for (let i = 0; i <= lenth; i += 1) {
      array.push(i);
    }
    return this.shuffleArray(array);
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return '';

    const { currentQuestion, questions } = this.state;
    console.log(questions[currentQuestion]);
    const maxAnswers = questions[currentQuestion].incorrect_answers.length;
    const numberArray = this.randomizeAnswers(maxAnswers);
    return (
      <div>
        <div data-testid="question-category">
          { questions[currentQuestion].category }
        </div>
        <div data-testid="question-text">
          { questions[currentQuestion].question }
        </div>
        <div>
          { numberArray.map((value) => {
            console.log(`Valor: ${value}`);
            if (value === Math.max(...numberArray)) {
              return (
                <CorrectAnswer answer={ questions[currentQuestion].correct_answer } />
              );
            }
            return (
              <WrongAnswer
                key={ value }
                index={ value }
                answer={ questions[currentQuestion].incorrect_answers[value] }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Questions;
