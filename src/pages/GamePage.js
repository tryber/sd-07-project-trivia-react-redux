import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getQuestions } from '../services/api';

import Quiz from '../components/Quiz';
import Header from '../components/Header';

class GamePage extends React.Component {
  constructor() {
    super();

    this.state = {
      queries: [],
      load: true,
      count: 30,
      index: 0,
    };
    this.getFetchQuestion = this.getFetchQuestion.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
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

  updateIndex(index) {
    const { queries } = this.state;
    if (queries.length - 1 >= index) {
      this.setState({ index });
    } else {
      const { history } = this.props;
      if (history) history.push('/feedback');
    }
  }

  render() {
    const { load, queries, count, index } = this.state;

    if (load) {
      return <h2>Loading...</h2>;
    }
    const {
      category,
      incorrect_answers: incorrectAnswers,
      question,
      correct_answer: correctAnswer,
      difficulty,
    } = queries[index];

    return (
      <div>
        <Header />
        <Quiz
          index={ index }
          count={ count }
          category={ category }
          question={ question }
          correctAnswer={ correctAnswer }
          incorrectAnswers={ incorrectAnswers }
          difficulty={ difficulty }
          updateIndex={ this.updateIndex }
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
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(GamePage);
