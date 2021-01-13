import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import * as callAPI from '../services/callAPI';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  async getQuestions() {
    const { token } = this.props;
    const requestQuestions = await callAPI.requestQuestions(token);
    this.setState({ questions: requestQuestions.results });
  }

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    return (
      <div>
        <Header />
        { this.state.questions[0] ? <Question item={ this.state.questions[0] }/> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
});

export default connect(mapStateToProps)(Game);
