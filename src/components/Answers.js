import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    this.mountQuestion = this.mountQuestion.bind(this);
  }

  mountQuestion(quest, index) {
    const {
      category,
      correct_answer: correct,
      incorrect_answers: wrong,
      question,
    } = quest;

    return (
      <div>
        <div>
          <h3 key={ `category${index}` } data-testid="question-category">{ category }</h3>
          <h2 key={ `question${index}` } data-testid="question-text">{ question }</h2>
        </div>
        <div>
          <div>
            <button
              key={ `correct${index}` }
              type="button"
              data-testid="correct-answer"
            >
              { correct }
            </button>
            { wrong.map((answer, set) => (
              <button
                key={ `wrong${set}` }
                type="button"
                data-testid={ `wrong-answer-${set}` }
              >
                { answer }
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    // Fazer um map das alternativas
    // Exibir as alternativas de forma aleatória
    // Contagem regressiva
    const { questions } = this.props;
    const { index } = this.state;
    console.log(questions);
    console.log(this.props);
    return (
      <div>
        <Header />
        <h1>Joguinho</h1>
        { this.mountQuestion(questions, index) }
        <div>Contagem regressiva</div>
        <button type="button">Próxima</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
});

Answers.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Answers);
