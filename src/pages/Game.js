import React from 'react';
import { connect } from 'react-redux';
import { Questions } from '../components';
import { fetchQuestionsTrivia } from '../actions/fetchQuestionsTrivia';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI() {
    const { questionsAction } = this.props;
    questionsAction();
  }
  handleRequest(){

  }
  render() {
    const { questions, isFetching } = this.props;
    return (
      <div>
        {isFetching ? (
          <p>Loading</p>
        ) : (
          <div>
            {questions.map((question) => (
               <Questions 
               category={question.category}
               question={question.question}
               difficulty={question.difficulty}
               correct_answer={question.correct_answer}
               incorrect_answers={question.incorrect_answers}
               />
            ))}
            <button onclick={this.handleRequest}>Próxima</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.receiveQuestions.questions,
  isFetching: state.receiveQuestions.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  questionsAction: (questions) => dispatch(fetchQuestionsTrivia(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
