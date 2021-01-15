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
    this.funcaoDoNonato = this.funcaoDoNonato.bind(this);
    this.state = {
      questionNumber: 0,
      timer: 10,
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
    const { scoreGen, questions, assertionsG, realScore } = this.props;
    const { questionNumber } = this.state;
    const { questionsList } = questions;
    const { difficulty } = questionsList[questionNumber];
    const { timer } = this.state;
    console.log(answer);
    if (answer === questionsList[questionNumber].correct_answer) {
      if (difficulty === 'hard') value = tree;
      if (difficulty === 'medium') value = two;
      if (difficulty === 'easy') value = one;
      scoreGen(realScore + (ten + (timer * value)));
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

  async funcaoDoNonato(e) {
    await this.scoreFunc(e);
    this.funcStorageAndAssertions();
  }

  incrementIndex() {
    this.setState((anterior) => ({
      questionNumber: anterior.questionNumber + 1,
    }));
  }

  render() {
    const { questionNumber } = this.state;
    const { questions } = this.props;
    const { questionsList } = questions;
    const five = 5;
    console.log(questionsList[questionNumber].difficulty);
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
            id="correct"
            onClick={ (e) => { this.funcaoDoNonato(e); } }
            value={ questionsList[questionNumber].correct_answer }
          >
            {questionsList[questionNumber].correct_answer}
          </button>
          {questionsList[questionNumber].incorrect_answers.map((q, index) => (
            <button
              key={ q }
              data-testid={ `wrong-answer-${index}` }
              className="wrong-answer"
              type="button"
              id="incorrect"
              onClick={ (e) => { this.funcaoDoNonato(e); } }
              value={ questionsList[questionNumber].incorrect_answers }
            >
              {q}
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

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  name: state.login.name,
  email: state.login.email,
  realScore: state.score.points,
  realAssertions: state.score.assertions,
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
};
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
