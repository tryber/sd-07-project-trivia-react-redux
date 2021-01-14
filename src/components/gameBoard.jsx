import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTriviaQuestions } from '../action';

class GameBoard extends Component {
  componentDidMount() {
    const { token, triviaAPI, isFetching } = this.props;
    console.log(token);
    triviaAPI(token);
}

  render() {
    return (
      <div>
        <h1>DALE</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.userReducer.isFetching,
  token: state.userReducer.apiToken.token,
  questions: state.gameReducer.apiData.results,
});

const mapDispatchToProps = (dispatch) => ({
  triviaAPI: (token) => dispatch(getTriviaQuestions(token)),
});

GameBoard.propTypes = {
  token: PropTypes.string.isRequired,
  triviaAPI: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
