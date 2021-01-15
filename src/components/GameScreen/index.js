import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import { getQuestions } from '../../redux/actions/gameActions';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    const limit = 4;
    this.state = {
      correct: Math.floor(Math.random() * limit),
      actual: 0,
      solved: false,
      timer: 30,
      // idTimer: 0,
    };

    this.questFrame = this.questFrame.bind(this);
    this.questFrameSolved = this.questFrameSolved.bind(this);
    this.renderScreen = this.renderScreen.bind(this);
    this.starTimer = this.starTimer.bind(this);
  }

  componentDidMount() {
    const { playerToken, getQuest } = this.props;
    getQuest(playerToken);
    this.starTimer();
  }

  starTimer() {
    const timeDesc = 1000;
    // const tempId =
    setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer > 0) {
          return ({ timer: prevState.timer - 1 });
        }
      });
    }, timeDesc);

    // this.setState({ idTimer: tempId });
  }

  questFrame() {
    // return <p>Loading</p>;

    const { questions } = this.props;
    const { actual, correct } = this.state;
    let counter = 0;

    // nada elegante
    const arrayDefault = ['', '', '', ''];

    if (questions.length > 0) {
      return questions[actual].type === 'boolean' ? (
        <div>
          <button
            onClick={ () => this.setState({ solved: true }) }
            type="button"
            data-testid={
              questions[actual].correct_answer === 'True'
                ? 'correct-answer'
                : 'wrong-answer'
            }
          >
            Verdadeiro
          </button>
          <button
            onClick={ () => this.setState({ solved: true }) }
            type="button"
            data-testid={
              questions[actual].correct_answer === 'False'
                ? 'correct-answer'
                : 'wrong-answer'
            }
          >
            False
          </button>
        </div>
      ) : (
        <div>
          {arrayDefault.map((elem, index) => {
            if (index === correct) {
              return (
                <button
                  onClick={ () => this.setState({ solved: true }) }
                  key={ questions[actual].correct_answer }
                  type="button"
                  data-testid="correct-answer"
                >
                  {questions[actual].correct_answer}
                </button>
              );
            }
            counter += 1;
            return (
              <button
                onClick={ () => this.setState({ solved: true }) }
                key={ questions[actual].incorrect_answers[counter - 1] }
                type="button"
                data-testid={ `wrong-answer-${counter - 1}` }
              >
                {questions[actual].incorrect_answers[counter - 1]}
              </button>
            );
          })}
        </div>
      );
    }
  }

  questFrameSolved() {
    // return <p>Loading</p>;

    const { questions } = this.props;
    const { actual, correct } = this.state;
    let counter = 0;

    // nada elegante
    const arrayDefault = ['', '', '', ''];

    if (questions.length > 0) {
      return questions[actual].type === 'boolean' ? (
        <div>
          <button
            type="button"
            disabled
            className={
              questions[actual].correct_answer === 'True'
                ? 'correct-answer'
                : 'wrong-answer'
            }
            data-testid={
              questions[actual].correct_answer === 'True'
                ? 'correct-answer'
                : 'wrong-answer'
            }
          >
            Verdadeiro
          </button>
          <button
            type="button"
            disabled
            className={
              questions[actual].correct_answer === 'False'
                ? 'correct-answer'
                : 'wrong-answer'
            }
            data-testid={
              questions[actual].correct_answer === 'False'
                ? 'correct-answer'
                : 'wrong-answer'
            }
          >
            False
          </button>
        </div>
      ) : (
        <div>
          {arrayDefault.map((elem, index) => {
            if (index === correct) {
              return (
                <button
                  disabled
                  key={ questions[actual].correct_answer }
                  className="correct-answer"
                  type="button"
                  data-testid="correct-answer"
                >
                  {questions[actual].correct_answer}
                </button>
              );
            }
            counter += 1;
            return (
              <button
                disabled
                key={ questions[actual].incorrect_answers[counter - 1] }
                className="wrong-answer"
                type="button"
                data-testid={ `wrong-answer-${counter - 1}` }
              >
                {questions[actual].incorrect_answers[counter - 1]}
              </button>
            );
          })}
        </div>
      );
    }
  }

  renderScreen() {
    const { solved, timer } = this.state;

    return solved || timer === 0 ? this.questFrameSolved() : this.questFrame();
  }

  render() {
    const { timer } = this.state;
    return (
      <>
        <p data-testid="question-category">Categoria</p>
        <p data-testid="question-text">Pergunta</p>
        {this.renderScreen()}
        {/* {this.questFrame()} */}
        <h2>{timer}</h2>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playerToken: state.user.token,
  questions: state.session.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuest: (token) => dispatch(getQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);

GameScreen.propTypes = {
  getQuest: PropTypes.func.isRequired,
  playerToken: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
