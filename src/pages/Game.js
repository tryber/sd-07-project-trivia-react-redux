import React from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../services/api';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: []
    }
    this.getFetchQuestion = this.getFetchQuestion.bind(this);
  }

  async componentDidMount() {
    await this.getFetchQuestion();
  }

  async getFetchQuestion() {
    const { token } = this.props;
    const questions = await getQuestions(token);
    console.log(questions);
  }

  render() {
    return (
      <div>
        <span data-testid="question-category">CATEGORIA DA PERGUNTA</span>
        <p data-testid="question-text" >TEXTO DA PERGUNTA</p>
        <button>Resposta</button>
      </div>
    )
  }
}

const mapStateToProps = ({ token }) => ({
  token: token.value,
});

export default connect(mapStateToProps)(Game);
