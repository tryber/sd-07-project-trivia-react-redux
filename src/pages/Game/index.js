import React, { Component } from 'react';
import {
  Header,
  Timer,
  Answers,
  ConfigButton,
  Next,
  Question,
} from '../../components';
import getApi from '../../services/api';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: '',
      questions: [],
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
  }

  render() {
    const { userToken, questions } = this.state;
    console.log(userToken);
    console.log(questions);
    return (
      <>
        <Header />
        <Timer />
        <Question />
        <Answers />
        <ConfigButton />
        <Next />
      </>
    );
  }
}

export default Game;
