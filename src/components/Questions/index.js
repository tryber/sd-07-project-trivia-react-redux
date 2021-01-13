import React, { Component } from 'react';
import { fetchQuestionNAnswer } from '../../services';

class Questions extends Component {
  constructor() {
    super();

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.state = {
      questions: [],
      isLoading: true,
      questionNumber: 0,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const token = localStorage.getItem('token');
    const result = await fetchQuestionNAnswer(token);
    this.setState({ questions: result, isLoading: false });
  }

  render() {
    const { questions, isLoading, questionNumber } = this.state;
    const questionToLoad = questions[questionNumber];
    if (isLoading) return <h1>Is Loading</h1>;
    return (
      <div>
        <h2 data-testid="question-category">{ questionToLoad.category }</h2>
        <h2 data-testid="question-text">{ questionToLoad.question }</h2>
        <button
          data-testid="correct-answer"
          type="button"
        >
          { questionToLoad.correct_answer }
        </button>
        { questionToLoad.incorrect_answers
          .map((answer, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              key={ index }
            >
              { answer }
            </button>)) }
      </div>
    );
  }
}

export default Questions;
