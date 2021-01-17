import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkApiQuestions, setScore, setAssertions, addRanking } from '../actions';
import Header from '../components/Header';
import Timer from '../components/Timer';
import ScoreCalc from '../helpers/ScoreCalc';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonCorrect: '',
      buttonError: '',
      counter: 0,
      buttonDisable: false,
      correctClick: false,
    };

    this.givesIfTrue = this.givesIfTrue.bind(this);
    this.givesIfFalse = this.givesIfFalse.bind(this);
    this.borderButton = this.borderButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.addPlayerToRank = this.addPlayerToRank.bind(this);
  }

  componentDidMount() {
    const { getQuestion } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getQuestion(token[token.length - 1]);
  }

  borderButton({ target }) {
    this.setState(
      {
        buttonCorrect: 'correct',
        buttonError: 'wrong-answer',
        buttonDisable: true,
      },
      () => {
        if (target.className === 'correct') {
          this.setState({ correctClick: true });
        }
      }
    );
  }

  stopTime() {
    this.setState({
      buttonCorrect: 'correct',
      buttonError: 'wrong-answer',
      buttonDisable: true,
    });
  }

  componentDidUpdate() {
    const { time, questions, addScore, addAssertions } = this.props;
    const { counter, correctClick } = this.state;
    if (time === 0) this.stopTime();
    if (correctClick) {
      const player = ScoreCalc(time, questions[counter].difficulty);
      this.setState({ correctClick: false });
      addScore(player.score);
      addAssertions(player.assertions);
    }
  }

  addPlayerToRank() {
    const { player } = this.props;
    const playerRank = { name: player.name, score: player.score, picture: player.gravatarEmail };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const value = ranking === null ? [] : ranking;
    value.push(playerRank);
    localStorage.setItem('ranking', JSON.stringify(value));
  }

  nextQuestion() {
    let { counter } = this.state;
    const { history } = this.props;
    this.setState(
      {
        buttonCorrect: '',
        buttonError: '',
        buttonDisable: false,
        counter: counter + 1,
      },
      () => {
        console.log(counter);
        if (counter === 4) {
          this.addPlayerToRank();
          history.push('/feedback');
        }
      }
    );
  }

  givesIfFalse(question) {
    const { buttonCorrect, buttonError, buttonDisable } = this.state;
    const answers = [...question.incorrect_answers, question.correct_answer];
    const sortAnswers = answers
      .map((answer, index) => {
        if (answer === question.correct_answer) {
          return (
            <button
              key={answer}
              type="button"
              disabled={buttonDisable}
              data-testid="correct-answer"
              className={buttonCorrect}
              onClick={this.borderButton}
            >
              {answer}
            </button>
          );
        }
        return (
          <button
            key={answer}
            type="button"
            disabled={buttonDisable}
            data-testid={`wrong-answer-${index}`}
            className={buttonError}
            onClick={this.borderButton}
          >
            {answer}
          </button>
        );
      })
      .sort(() => {
        const magicNumber = 0.5;
        return Math.random() - magicNumber;
      });

    return (
      <div>
        <Header />
        <div data-testid="question-category">{question.category}</div>
        <div>
          Pergunta:
          <div data-testid="question-text">{question.question}</div>
        </div>
        <div>
          Alternativas:
          {sortAnswers}
        </div>
        <Timer stop={this.state.buttonDisable} />
        <button
          type="button"
          onClick={this.nextQuestion}
          data-testid="btn-next"
          hidden={!buttonDisable}
        >
          Próxima Pergunta
        </button>
      </div>
    );
  }

  givesIfTrue(counter) {
    if (counter > 4) return <div></div>
    return <div>Carregando</div>;
  }

  render() {
    const { questions } = this.props;
    const { counter } = this.state;
    return questions === undefined || questions.length === 0 || counter > 4
      ? this.givesIfTrue(counter)
      : this.givesIfFalse(questions[counter]);
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.results,
  player: state.player,
  time: state.questions.time,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (token) => dispatch(thunkApiQuestions(token)),
  addScore: (score) => dispatch(setScore(score)),
  addAssertions: (assertions) => dispatch(setAssertions(assertions)),
  addToRank: (rank) => dispatch(addRanking(rank)),
});

Questions.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  questions: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
