import React, { Component } from 'react';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    };

    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.renderTrivia = this.renderTrivia.bind(this);
    this.fetchTriviaQuestions = this.fetchTriviaQuestions.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
  }

  componentDidMount() {
    this.updateLocalState();
  }

  fetchTriviaQuestions() {
    // const five = 5;
    const endpoint = 'https://opentdb.com/api.php?amount=5';
    const token = localStorage.getItem('token');
    console.log(token);
    return fetch(`${endpoint}&token=${token}`)
      .then((response) => response.json());
  }

  async updateLocalState() {
    const responseAPI = await this.fetchTriviaQuestions();
    this.setState({
      questions: responseAPI.results,
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
    const { questions } = this.state;
    console.log(questions);
    if (questions.length > 0) {
      return (
        <div>
          <div data-testid="question-category">
            {/* Categoria: */}
            {questions[0].category}
          </div>
          <div data-testid="question-text">
            {/* Pergunta: */}
            { questions[0].question }
          </div>
          <div>
            { this.renderTrivia(questions[0].correct_answer, questions[0]
              .incorrect_answers) }
          </div>
        </div>
      );
    }
    return <p>Loading... </p>;
  }
}

export default Questions;
