import React from 'react';
import * as API from '../services/API';

class Questions extends React.Component {
  constructor() {
    super();
    this.incrementIndex = this.incrementIndex.bind(this);
    this.fetchQ = this.fetchQ.bind(this);
    this.state = {
      questionNumber: 0,
      questions: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchQ();
  }

  async fetchQ() {
    const token = localStorage.getItem('token');
    const questions = await API.fetchQuestions(token);
    this.setState({ questions, isLoading: false });
  }

  incrementIndex() {
    // const { questionNumber } = this.state;
    // this.setState({ questionNumber: questionNumber + 1 });
    this.setState((anterior) => ({
      questionNumber: anterior.questionNumber + 1,
    }));
  }

  render() {
    const { questionNumber, isLoading } = this.state;
    if (isLoading === true) {
      return <div>Carregando...</div>;
    }
    const { questions } = this.state;
    const { category } = questions[questionNumber];
    return (
      <div>
        {`Questão número ${questionNumber + 1}`}
        <div>
          <h2 data-testid="question-category">
            {category}
          </h2>
          <p data-testid="question-text">
            {questions[questionNumber].question}
          </p>
        </div>
        <div>
          <button type="button" data-testid="correct-answer">
            {questions[questionNumber].correct_answer}
          </button>
          {questions[questionNumber].incorrect_answers.map((resposta) => (
            <button
              type="button"
              data-testid={ `wrong-answer-${questionNumber}` }
              key={ resposta }
            >
              {resposta}
            </button>
          ))}
        </div>
        <button type="button" onClick={ () => this.incrementIndex() }>
          Próxima
        </button>
      </div>
    );
  }
}

export default Questions;
