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
      disabledTimeOut: false,
      timer: 25,
    };
    this.handleQuest = this.handleQuest.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.disableQuestion = this.disableQuestion.bind(this);
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
    this.setState({ right: 'right', wrong: 'wrong' });
  }

  disableQuestion() {
    const { timer } = this.state;
    if (timer <= 0) {
      this.setState({ disabledTimeOut: true });
    }
  }

  timeOut() {
    setInterval(() => {
      this.setState((state) => ({
        timer: state.timer - 1,
      }), this.disableQuestion);
    }, 1000);
  }

  render() {
    const {
      category,
      question,
      resps,
      right,
      wrong,
      disabledTimeOut,
      timer,
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
          {timer}
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
