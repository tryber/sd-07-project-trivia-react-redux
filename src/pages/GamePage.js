import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getQuestions } from '../services/api';

import Quiz from '../components/Quiz';
import Timer from '../components/Timer';
import Header from '../components/Header';

class GamePage extends React.Component {
  constructor() {
    super();

    this.state = {
      queries: [],
      load: true,
      disableButton: false,
    };
    this.getFetchQuestion = this.getFetchQuestion.bind(this);
    this.disableButton = this.disableButton.bind(this);
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

  disableButton() {
    this.setState({ disableButton: true });
  }

  render() {
    const { load, queries, disableButton } = this.state;

    if (load) {
      return <h2>Loading...</h2>;
    }
    const {
      category,
      incorrect_answers: incorrectAnswers,
      question,
      correct_answer: correctAnswer,
    } = queries[0];

    return (
      <div>
        <Header />
        <Timer
          disable={ this.disableButton }
        />
        <Quiz
          disabledButton={ disableButton }
          category={ category }
          question={ question }
          correctAnswer={ correctAnswer }
          incorrectAnswers={ incorrectAnswers }
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
