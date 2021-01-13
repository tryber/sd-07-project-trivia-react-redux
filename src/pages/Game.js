import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
//  import  './App.css'

class Game extends Component {
  constructor() {
    super();
    this.renderAllDataQuestion = this.renderAllDataQuestion.bind(this);
    this.handleUserAnswer = this.handleUserAnswer.bind(this);
    this.state = {
      questionIndex: 0,
     correctAnswerValue: "",
     wrongAnswerValue: "",
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  renderAllDataQuestion() {
    console.log()
    const { questionIndex } = this.state;
    const { questions } = this.props;

   
    if (questions.results) {
      const correctAnswer = (
        <button  type="button" 
         data-testid="correct-answer" onClick={this.handleUserAnswer} id="ok">
          { questions.results[questionIndex].correct_answer }
        </button>
      );
      const wrongAnswer = questions.results[questionIndex].incorrect_answers.map((answer, index) => (
        <button   onClick={this.handleUserAnswer} type="button"  key={ answer } 
        data-testid={ `wrong-answer-${index}`} id="notOk">
          {answer}
        </button>
      ));
      return [correctAnswer, ...wrongAnswer];
    }
  }

  handleUserAnswer(e) {
    const { id } = e.target
    e.currentTarget.className = "btnColorRed"

    if(id === "ok"){
      e.currentTarget.className = "btnColorGreen"

    } 
  

  //   const { questionIndex } = this.state;
  //   const { questions } = this.props;

  // this.setState({...this.state, correctAnswerValue: questions.results[questionIndex].correct_answer })
  //  const {value } = e.target
  //  console.log("oi",)
  //  if(value=== this.state.correctAnswerValue){
  //   e.currentTarget.className = "btnColorGreen"
  //  } 
  //   else(value !== this.state.correctAnswerValue)
  //   { 
  //     e.currentTarget.className = "btnColorRed"

  //     }
  }


  render() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    return questions.results ? (
      <div>
        <h1>TELA DE JOGO</h1>
        <h3 data-testid="question-category">
          {questions.results[questionIndex].category}
        </h3>
        <h2 data-testid="question-text">
          {questions.results[questionIndex].question}
        </h2>
        <div>{this.renderAllDataQuestion()}</div>
      </div>
    ) : (
      <p>loading</p>
    );
  }
}
const mapStateToProps = ({ gameReducer }) => ({
  questions: gameReducer.questions,
  isFetching: gameReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(Object).isRequired,
  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
};
