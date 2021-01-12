import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from './header';

class Play extends Component {
  constructor() {
    super();
    this.state = {
      trivia: [],
    };
    this.triviaApi = this.triviaApi.bind(this);
  }

  componentDidMount() {
    this.triviaApi();
  }

  trivia() {
    const { trivia } = this.state;
    return (
      <div>
        {trivia.map((question, index) => (
          <div key={ index }>
            <p data-testid="question-category">{question.category}</p>
            <p data-testid="question-text">{question.question}</p>
            <button
              type="button"
              data-testid="correct-answer"
            >
              {question.correct_answer}
            </button>
            {question.incorrect_answers.map((incorrect, index2) => (
              <div key={ index2 }>
                <button
                  type="button"
                  data-testid={ `wrong-answer-${index2}` }
                >
                  {incorrect}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>);
  }

  triviaApi() {
    const { token } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    fetch(url).then((response) => response.json())
      .then((json) => { this.setState({ trivia: json.results }); });
  }

  render() {
    const { name, score = 0 } = this.props;
    const { trivia } = this.state;
    return (
      <div>
        <Header />        
        { trivia ? this.trivia() : <p>Em breve!</p> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  email: state.login.email,
  name: state.player.name,
  score: state.player.score,
});

Play.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Play);
