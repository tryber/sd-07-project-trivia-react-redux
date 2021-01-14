import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getQuestions } from '../services/api';

import Quiz from '../components/Quiz';
import Timer from '../components/Timer';
import Header from '../components/Header';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: [],
      load: true,
      count: 30,
      index: 0,
      disableButton: false,
    };
    this.disableButton = this.disableButton.bind(this);
    this.getFetchQuestion = this.getFetchQuestion.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
  }

  async componentDidMount() {
    this.myTime();
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

  myTime() {
    const timerResponse = setInterval(() => {
      this.setState((prevSate) => ({
        count: prevSate.count - 1,
      }));
      const { count } = this.state;
      if (count === 0) {
        this.disableButton();
        clearInterval(timerResponse);
      }
      // eslint-disable-next-line no-magic-numbers
    }, 1000);
  }

  disableButton() {
    this.setState({ disableButton: true });
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
    const { load, queries, count, index, disableButton } = this.state;

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
        <Timer
          count={ count }
        />
        <Quiz
          disabledButton={ disableButton }
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
