import React from 'react';
import { connect } from 'react-redux';
import { thunkApiQuestions } from '../actions';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contador: 0,
    };

    this.questionsFunc = this.questionsFunc.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);

  }

  questionsFunc() {
    const { getQuestion, token } = this.props;
    getQuestion(token);
  }

  async renderQuestions() {
    await this.questionsFunc();
    const { questions } = this.props;
    const { contador } = this.state;
    const question = questions[contador];
    if(question === undefined) {
      return "sem perguntas";
    }
    return (
      <div>
        <div>
          Pergunta:
          <p>{ question.question }</p>
        </div>
        <div>
          Possiveis Respostas:
          <p>{ question.correct_answer }</p>
          <p>{ question.incorrect_answers }</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <p> { this.renderQuestions }</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
  questions: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (token) => dispatch(thunkApiQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);