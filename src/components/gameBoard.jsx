import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTriviaQuestions } from '../action';

class GameBoard extends Component {

  render() {
    const { triviaAPI, token } = this.props;
    triviaAPI(token);
    return (
      <div>
        <h1>
          Vamos Jogar!
        </h1>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer: { apiToken: { token } } }) => ({
  token,
});

const mapDispatchToProps = (dispatch) => ({
  triviaAPI: (token) => dispatch(getTriviaQuestions(token)),
});

GameBoard.propTypes = {
  token: PropTypes.string.isRequired,
  triviaAPI: PropTypes.func.isRequired,
  // isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
