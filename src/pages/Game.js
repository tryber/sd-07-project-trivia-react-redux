import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

class Game extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const {questions} = this.props;
    console.log(questions[0]{question});
    return (
      <div>
        <h1>TELA DE JOGO</h1>
        <p>{}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ gameReducer }) => ({
  questions: gameReducer.questions.results,

});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
