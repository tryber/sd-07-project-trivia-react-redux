import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pointsGen, assertionsGen } from '../actions';

class Questions extends React.Component {
  constructor() {
    super();
    this.incrementIndex = this.incrementIndex.bind(this);
    this.scoreFunc = this.scoreFunc.bind(this);
    this.funcStorageAndAssertions = this.funcStorageAndAssertions.bind(this);
    this.buttonColor = this.buttonColor.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);

    this.state = {
      questionNumber: 0,
      correctAnswer: 'neutral',
      wrongAnswer: 'neutral',
      visibleClick: false,
    };
  }

  componentDidMount() {
    this.funcStorageAndAssertions();
  }

  scoreFunc(e) {
    const answer = e.target.value;
    let value = 0;
    const ten = 10;
    const tree = 3;
    const two = 2;
    const one = 1;
    const { scoreGen, questions, assertionsG, realScore, seconds } = this.props;
    const { questionNumber } = this.state;
    const { questionsList } = questions;
    const { difficulty } = questionsList[questionNumber];
    if (answer === questionsList[questionNumber].correct_answer) {
      if (difficulty === 'hard') value = tree;
      if (difficulty === 'medium') value = two;
      if (difficulty === 'easy') value = one;
      scoreGen(realScore + (ten + (seconds * value)));
      assertionsG(one);
    }
  }

  funcStorageAndAssertions() {
    const { name, email, realScore, realAssertions } = this.props;
    const objStorage = {};
    objStorage.player = {
      name,
      assertions: realAssertions,
      score: realScore,
      gravatarEmail: email,
    };
    console.log(JSON.stringify(objStorage));
    const storage = localStorage.setItem('state', JSON.stringify(objStorage));
    return storage;
  }

  incrementIndex() {
    const four = 4;
    this.setState((anterior) => ({
      questionNumber: anterior.questionNumber + 1,
      visibleClick: false,
    }));
    const { questionNumber } = this.state;
    console.log(questionNumber);
    if (questionNumber === four) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState({ correctAnswer: 'neutral', wrongAnswer: 'neutral' });
  }

  async allFunctionsOfButton(e) {
    await this.scoreFunc(e);
    this.funcStorageAndAssertions();
    this.buttonColor();
    this.renderNextButton();
  }

  buttonColor() {
    this.setState({
      correctAnswer: 'correctAnswer',
      wrongAnswer: 'wrongAnswer',
    });
  }

  renderNextButton() {
    this.setState({ visibleClick: true });
  }

  render() {
    const { questions, timer } = this.props;
    const { questionsList } = questions;
    const {
      questionNumber,
      wrongAnswer,
      correctAnswer,
      visibleClick,
    } = this.state;
    const five = 5;
    if (questionsList < five) {
      return <div>Efetue o login novamente</div>;
    }

    return (
      <div>
        {`Questão número ${questionNumber + 1}`}
        <div>
          <h2 data-testid="question-category">
            {questionsList[questionNumber].category}
          </h2>
          <p data-testid="question-text">
            {questionsList[questionNumber].question}
          </p>
        </div>
        <div>
          <button
            type="button"
            data-testid="correct-answer"
            value={ questionsList[questionNumber].correct_answer }
            onClick={ (e) => this.allFunctionsOfButton(e) }
            className={ correctAnswer }
            disabled={ timer }
          >
            {questionsList[questionNumber].correct_answer}
          </button>
          {questionsList[questionNumber].incorrect_answers.map((q, index) => (
            <button
              key={ q }
              data-testid={ `wrong-answer-${index}` }
              type="button"
              value={ questionsList[questionNumber].incorrect_answers }
              disabled={ timer }
              className={ wrongAnswer }
              onClick={ (e) => this.allFunctionsOfButton(e) }
            >
              {q}
            </button>
          ))}
        </div>
        {visibleClick || timer ? (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.incrementIndex }
          >
            Next
          </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  name: state.login.name,
  email: state.login.email,
  realScore: state.score.points,
  realAssertions: state.score.assertions,
  seconds: state.questions.seconds,
  timer: state.questions.timer,
});

const mapDispatchToProps = (dispatch) => ({
  scoreGen: (points) => dispatch(pointsGen(points)),
  assertionsG: (assertions) => dispatch(assertionsGen(assertions)),
});

Questions.propTypes = {
  questions: PropTypes.shape({
    questionsList: PropTypes.arrayOf(PropTypes.string, PropTypes.array)
      .isRequired,
  }).isRequired,
  scoreGen: PropTypes.shape(PropTypes.string, PropTypes.number)
    .isRequired,
  assertionsG: PropTypes.shape(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  realScore: PropTypes.number.isRequired,
  realAssertions: PropTypes.number.isRequired,
  timer: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  seconds: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
