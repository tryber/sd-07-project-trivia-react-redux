import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import '../App.css';
import GameHeader from '../components/GameHeader';

class Game extends Component {
  constructor() {
    super();
    this.renderAllDataQuestion = this.renderAllDataQuestion.bind(this);
    this.handleUserAnswer = this.handleUserAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleClasses = this.handleClasses.bind(this);


    this.state = {
      questionIndex: 0,
      showBtn: false,
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    
    getQuestions();
  }

 handleClasses(type){
  document.querySelectorAll('.btnQuestion').forEach((button) => {
    if(type === "add"){
      const { id } = button;
      if (id === 'ok') {
        button.classList.add('btnColorGreen');
      }
      button.classList.add('btnColorRed');
    }else{
      button.classList.remove('btnColorGreen')
      button.classList.remove('btnColorRed')
    }
   
  });
 }
  handleUserAnswer() {
    this.handleClasses('add')
    this.setState({...this.state, showBtn: true })
  }

  nextQuestion(){
    const { getQuestions} = this.props;
    this.handleClasses('remove')
    getQuestions();
  }


  renderAllDataQuestion() {
    // console.log()
    const { questionIndex } = this.state;
    const { questions } = this.props;

    if (questions.results) {
      const correctAnswer = (
        <button
          className="btnQuestion"
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleUserAnswer }
          key="correct"
          id="ok"
        >
          { questions.results[questionIndex].correct_answer }
        </button>
      );
      const wrongAnswer = questions.results[questionIndex].incorrect_answers
        .map((answer, index) => (
          <button
          className="btnQuestion"
            onClick={ this.handleUserAnswer }
            type="button"
            key={ answer }
            data-testid={ `wrong-answer-${index}` }
            id="notOk"
          >
            {answer}
          </button>
        ));
      return [correctAnswer, ...wrongAnswer];
    }
  }

 
  render() {
    const { questionIndex , showBtn } = this.state;
    const { questions } = this.props;
    return questions.results ? (
      <div>
        <GameHeader />
        <h1>TELA DE JOGO</h1>
        <h3 data-testid="question-category">
          {questions.results[questionIndex].category}
        </h3>
        <h2 data-testid="question-text">
          {questions.results[questionIndex].question}
        </h2>
        <div>{this.renderAllDataQuestion()}</div>
        { showBtn && (
          <button data-testid="btn-next" onClick={this.nextQuestion}>Próxima pergunta</button>
        )}        
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

Game.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(Object),
  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
