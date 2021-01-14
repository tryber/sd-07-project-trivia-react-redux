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
      numberArray: [],
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
    this.randomizeAnswers();
  }

  // shuffleArray from https://stackoverflow.com/a/12646864
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  randomizeAnswers() {
    const { currentQuestion, questions } = this.state;
    console.log(questions);
    const maxAnswers = questions[currentQuestion].incorrect_answers.length;
    let array = [];
    for (let i = 0; i <= maxAnswers; i += 1) {
      array.push(i);
    }
    array = this.shuffleArray(array);
    this.setState({ numberArray: array });
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return '';
    const { currentQuestion, questions, numberArray } = this.state;
    const { difficulty } = questions[currentQuestion];
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
                <CorrectAnswer
                  key={ value }
                  difficulty={ difficulty }
                  answer={ questions[currentQuestion].correct_answer }
                />
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
