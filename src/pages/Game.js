import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions/index'

class Game extends Component {
  constructor(props) {
    super(props);
    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.answerAnalyze = this.answerAnalyze.bind(this);
  }

  componentDidMount() {
    this.fetchQuestion();
  }

  async fetchQuestion() {
    const { getQuestions, token } = this.props;
    await getQuestions(token)
  }

  answerAnalyze(event) {
    console.log(event.target.value)
  }


  render() {
    const { name, questions, isFetching } = this.props;
    if (isFetching) {
      return <p>Loading</p>
    }
    return (
      <div>
        <header>
          <img
            alt="Imagem do Gravatar"
            data-testid="header-profile-picture"
            src="https://img.ibxk.com.br/2014/06/06/06165614150388.jpg?w=1120&h=420&mode=crop&scale=both"
          />
          <h2
            data-testid="header-player-name"
          >
            {name}
          </h2>
          <h2
            data-testid="header-score"
          >
            0
          </h2>
        </header>
        <section>
          {<div>
            {questions && questions.map(
              ({
                category,
                correct_answer,
                incorrect_answers,
                question,
              }) => (
                <div key={Math.random()}>
                  <h5 data-testid="question-category">{category}</h5>
                  <h5 data-testid="question-text">{question}</h5>
                  <button data-testid="correct-answer" value={'correct'} onClick={(e) => this.answerAnalyze(e)}>{correct_answer}</button>
                  {incorrect_answers.map((answer, index) => (<button data-testid={`wrong-answer-${index}`} value={'incorrect'} onClick={(e) => this.answerAnalyze(e)} >{answer}</button>))}
                </div>
              ),
            )}
          </div>}
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  token: state.tokenReducer.token,
  questions: state.questionsReducer.questions,
  isFetching: state.questionsReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
