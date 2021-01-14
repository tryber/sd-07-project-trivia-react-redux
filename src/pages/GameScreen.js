import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import requestQuest from '../store/ducks/QuestionsRequest/actions';
import './styles.css';

class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      category: 'Loading...',
      question: 'Loading...',
      // respCorrect: '',
      resps: [],
      right: '',
      wrong: '',
      buttonNext: false,
      id: 1,
      disabledTimeOut: false,
      timer: 30,
    };
    this.handleQuest = this.handleQuest.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.disableQuestion = this.disableQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  async componentDidMount() {
    const { actionRequest } = this.props;
    await actionRequest();
    this.handleQuest();
    this.timeOut();
  }

  handleQuest() {
    const { quest } = this.props;
    console.log('q', quest);
    if (quest.length === 0) {
      return null;
    }
    this.setState({
      category: quest[0].category,
      question: quest[0].question,
      // respCorrect: quest[1].correct_answer,
      resps: [quest[0].correct_answer, ...quest[0].incorrect_answers],
    });
  }

  changeStyle() {
    this.setState({ right: 'right', wrong: 'wrong', buttonNext: true });
  }

  nextQuestion() {
    const { quest } = this.props;
    const { id } = this.state;
    this.setState({ id: id + 1 });
    this.setState({
      category: quest[id].category,
      question: quest[id].question,
      // respCorrect: quest[1].correct_answer,
      resps: [quest[id].correct_answer, ...quest[id].incorrect_answers],
      buttonNext: false,
      timer: 30,
    });
  }

  disableQuestion() {
    const { timer } = this.state;
    if (timer <= 0) {
      this.setState({ disabledTimeOut: true });
    }
  }

  timeOut() {
    const ONE_SEC = 1000;
    setInterval(() => {
      this.setState((state) => ({
        timer: state.timer - 1,
      }), this.disableQuestion);
    }, ONE_SEC);
  }

  render() {
    console.log('state:', this.state);

    const {
      category,
      question,
      resps,
      right,
      wrong,
      disabledTimeOut,
      timer,
      buttonNext,
    } = this.state;

    return (
      <div>
        <div>
          <Header />
        </div>

        <div>
          <div data-testid="question-category">{category}</div>
          <div data-testid="question-text">{question}</div>
          <div>
            <button
              className={ right }
              data-testid="correct-answer"
              type="button"
              onClick={ this.changeStyle }
              disabled={ disabledTimeOut }
            >
              {resps[0]}
            </button>
            <button
              className={ wrong }
              data-testid="wrong-answer-1"
              type="button"
              onClick={ this.changeStyle }
              disabled={ disabledTimeOut }
            >
              {resps[1]}
            </button>
            <button
              className={ wrong }
              data-testid="wrong-answer-2"
              type="button"
              onClick={ this.changeStyle }
              disabled={ disabledTimeOut }
            >
              {resps[2]}
            </button>
            <button
              className={ wrong }
              data-testid="wrong-answer-3"
              type="button"
              onClick={ this.changeStyle }
              disabled={ disabledTimeOut }
            >
              {resps[3]}
            </button>
          </div>
          {buttonNext && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.nextQuestion }
            >
              Próxima
            </button>
          )}
          {!disabledTimeOut && timer}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ QuestionRequest: { quest } }) => ({
  quest,
});
const mapDispatchToProps = { actionRequest: requestQuest };

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);

GameScreen.propTypes = {
  actionRequest: PropTypes.func.isRequired,
  quest: PropTypes.arrayOf().isRequired,
};
