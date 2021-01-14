import React, { Component } from 'react';
import {
  Header,
  Timer,
  Answer,
  ConfigButton,
  Next,
  Title,
  QuestionCategory,
} from '../../components';
import getApi from '../../services/api';
import './style.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: '',
      questions: [],
      isFetching: true,
      turn: 0,
    };
    this.handleApiRequisition = this.handleApiRequisition.bind(this);
  }

  componentDidMount() {
    this.handleApiRequisition();
  }

  async handleApiRequisition() {
    const tokenUrl = 'https://opentdb.com/api_token.php?command=request';
    const apiTokenResult = await getApi(tokenUrl);
    const { token } = apiTokenResult;
    this.setState({ userToken: token });

    const { userToken } = this.state;
    const questionUrl = `https://opentdb.com/api.php?amount=5&token=${userToken}`;
    const apiQuestionresult = await getApi(questionUrl);
    const { results } = apiQuestionresult;
    this.setState({ questions: results });

    // eslint-disable-next-line react/no-unused-state
    this.setState({ isFetching: false });
  }

  render() {
    const { questions, isFetching, turn } = this.state;
    const curQuestion = questions[turn];

    console.log(questions);

    if (isFetching) {
      return (<h1>Loading</h1>);
    } return (
      <div>
        <Header />
        <Timer />
        <QuestionCategory />
        <Title title={ curQuestion.question } dataTestid="question-text" />
        <Answer curQuestion={ curQuestion } />
        <ConfigButton />
        <Next />
      </div>
    );
  }
}

export default Game;
