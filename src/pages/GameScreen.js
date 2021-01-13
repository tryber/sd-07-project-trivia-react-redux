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
    };
    this.handleQuest = this.handleQuest.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
  }

  async componentDidMount() {
    const { actionRequest } = this.props;
    await actionRequest();
    this.handleQuest();
  }

  handleQuest() {
    const { quest } = this.props;
    console.log(quest);
    this.setState({
      category: quest[1].category,
      question: quest[1].question,
      // respCorrect: quest[1].correct_answer,
      resps: [quest[1].correct_answer, ...quest[1].incorrect_answers],
    });
  }

  changeStyle() {
    this.setState({ right: 'right', wrong: 'wrong' });
  }

  render() {
    const { category, question, resps, right, wrong } = this.state;
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
            >
              {resps[0]}
            </button>
            <button
              className={ wrong }
              data-testid="wrong-answer-1"
              type="button"
              onClick={ this.changeStyle }
            >
              {resps[1]}
            </button>
            <button
              className={ wrong }
              data-testid="wrong-answer-2"
              type="button"
              onClick={ this.changeStyle }
            >
              {resps[2]}
            </button>
            <button
              className={ wrong }
              data-testid="wrong-answer-3"
              type="button"
              onClick={ this.changeStyle }
            >
              {resps[3]}
            </button>
          </div>
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
