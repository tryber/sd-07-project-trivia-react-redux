import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [{
        question: '',
        category: '',
        correct_answer: '',
        incorrect_answers: [] }],
      index: 0,
      status: true,
      finalQuestion: false,
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    const { token } = this.props;
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({
        questions: data.results,
      }));
  }

  nextQuestion() {
    const { index } = this.state;
    if(index<4) {this.setState({
      index: index + 1,
    });}
    else {
      this.setState({
        finalQuestion: true,
      })
    }
  }

  clickButton() {
    this.setState({
      status: false,
    });
  }

  render() {
    const { questions, index, status, finalQuestion } = this.state;
    if (finalQuestion) {
      return (
        <Redirect to='/feedback'/>
      )
    }
    return (
      <div>
        <h3>
          Question
        </h3>
        <div id="bloco-pergunta">
          <div id="categoria-pergunta">
            <span
              data-testid="question-category"
            >
              Category:
              {questions[index].category}
            </span>
          </div>
        </div>
        <span data-testid="question-text">
          {questions[index].question}
        </span>
        <div id="bloco-respostas">
          <button
            onClick={ this.clickButton }
            type="button"
            key="correct"
            data-testid="correct-answer"
          >
            {questions[index].correct_answer}
          </button>
          {questions[index].incorrect_answers
            .map((item, itemIndex) => (
              <button
                onClick={ this.clickButton }
                type="button"
                key="incorrect"
                data-testid={ `wrong-answer-${itemIndex}` }
              >
                { item }
              </button>))}
        </div>
        <button
          className={ status ? 'unvisible' : '' }
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Next
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  token: PropTypes.string.isRequired,
};
