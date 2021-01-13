import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../services/api';
import Quiz from '../components/Quiz';

class GamePage extends React.Component {
  constructor() {
    super();

    this.state = {
      queries: [],
      load: true,
    };
    this.getFetchQuestion = this.getFetchQuestion.bind(this);
  }

  async componentDidMount() {
    await this.getFetchQuestion();
  }

  async getFetchQuestion() {
    const { token } = this.props;
    const quiz = await getQuestions(token);
    console.log(quiz);
    this.setState({
      queries: quiz,
      load: false,
    });
  }

  render() {
    const { load, queries } = this.state;

    if (load) {
      return <h2>Loading...</h2>
    }
    const {
      category,
      incorrect_answers,
      question,
      correct_answer,
    } = queries[0];

    return (
      <div>
        <Quiz
          category={ category }
          question={ question }
          correctAnswer={ correct_answer }
          incorrectAnswers={ incorrect_answers }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ token }) => ({
  token: token.value,
});

GamePage.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(GamePage);
