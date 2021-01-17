import React, { Component } from 'react';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      isLoading: true,
    };

    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.renderTrivia = this.renderTrivia.bind(this);
    this.fetchTriviaQuestions = this.fetchTriviaQuestions.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
  }

  componentDidMount() {
    this.updateLocalState();
  }

  async fetchTriviaQuestions() {
    // const five = 5;
    const endpoint = 'https://opentdb.com/api.php?amount=5';
    const token = localStorage.getItem('token');
    console.log(token);
    const getQuestions = await fetch(`${endpoint}&token=${token}`);
    const response = await getQuestions.json();
    return response;
  }

  async updateLocalState() {
    const responseAPI = await this.fetchTriviaQuestions();
    const { results } = responseAPI;
    await this.setState({
      questions: results,
      isLoading: false,
    });
  }

  shuffleAnswers(array) {
    const randomNumber = 0.5;
    return array.sort(() => Math.random() - randomNumber);
  }

  renderTrivia(rightAnswer, wrongAnswers) {
    const wrong = [];
    const right = (
      <button
        type="button"
        data-testid="correct-answer"
        key={ Math.random() }
      >
        {rightAnswer}
      </button>
    );
    wrongAnswers.map((wrongAnswer, index) => wrong.push(
      <button type="button" key={ index } data-testid={ `wrong-answer-${index}` }>
        {wrongAnswer}
      </button>,
    ));
    const answers = [right, ...wrong];
    const randomOptions = this.shuffleAnswers(answers);
    return randomOptions;
  }

  render() {
    const { isLoading, questions } = this.state;
    console.log(questions);
    console.log(isLoading);
    return isLoading ? <p>Loading</p>
      : (
        <div>
          <div key={ Math.random() }>
            <h3 data-testid="question-category">
              Categoria:
              {questions[0].category}
            </h3>
            <p data-testid="question-text">
              Pergunta:
              { questions[0].question }
            </p>
            <div>
              { this.renderTrivia(questions[0].correct_answer, questions[0]
                .incorrect_answers) }
            </div>
          </div>
        </div>
      );
  }
}

export default Questions;
