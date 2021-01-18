import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getTriviaQuestions } from '../services/API';
import Questions from '../components/Questions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const { dispatchTrivia } = this.props;
    const token = localStorage.getItem('token');
    await dispatchTrivia(token);
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        <Header />
        { (isFetching) ? <div>Loading...</div> : <Questions /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.triviaReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchTrivia: (token) => dispatch(getTriviaQuestions(token)),
});

Game.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatchTrivia: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
