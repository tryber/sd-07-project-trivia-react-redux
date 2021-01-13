import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addScore } from '../Redux/Actions';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [{
        question: '',
        category: '',
        correct_answer: '',
        incorrect_answers: [],
      }],
      index: 0,
      status: true,
      score: 0,
      seconds: 30,
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.clickButton = this.clickButton.bind(this);
    this.clickRightAnswer = this.clickRightAnswer.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
    const oneSecond = 1000;
    const myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds: prevSeconds }) => ({
          seconds: prevSeconds - 1,
        }));
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, oneSecond);
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
    this.setState({
      index: index + 1,
      seconds: 30,
    });
  }

  clickRightAnswer() {
    const { addScoreAction } = this.props;
    const { score, questions, index, seconds } = this.state;
    const hard = 3;
    const medium = 2;
    let difficulty = 0;
    if (questions[index].difficulty === 'hard') {
      difficulty = hard;
    } else if (questions[index].difficulty === 'medium') {
      difficulty = medium;
    } else {
      difficulty = 1;
    }
    const multiplePoints = 10;
    const finalCount = multiplePoints + (seconds * difficulty);
    addScoreAction(score + finalCount);
    this.setState({
      score: score + finalCount,
    });
    const player = {
      name: '',
      assertions: '',
      score: score + finalCount,
      gravatarEmail: '',
    };

    localStorage.setItem('state', JSON.stringify(player));
    this.clickButton();
  }

  clickButton() {
    this.setState({
      status: false,
    });
  }

  render() {
    const { questions, index, status, seconds } = this.state;
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
            onClick={ this.clickRightAnswer }
            disabled={ seconds === 0 }
            type="button"
            key="correct"
            data-testid="correct-answer"
          >
            {questions[index].correct_answer}
          </button>
          {questions[index].incorrect_answers
            .map((item, itemIndex) => (
              <button
                disabled={ seconds === 0 }
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
        <span>
          Tempo restante:
          { seconds }
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
  score: state.user.score,
});

const mapDispatchToProps = (dispatch) => ({
  addScoreAction: (score) => dispatch(addScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  token: PropTypes.string.isRequired,
  addScoreAction: PropTypes.func.isRequired,
};
