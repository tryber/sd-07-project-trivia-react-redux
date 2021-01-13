import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getTriviaQuestions } from '../services/API';
import Queries from '../components/Queries';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.fetchQueries = this.fetchQueries.bind(this);
  }

  componentDidMount() {
    this.fetchQueries();
  }

  async fetchQueries() {
    const { dispatchTrivia } = this.props;
    const token = localStorage.getItem('token');
    await dispatchTrivia(token);
  }

  render() {
    const { isFetching } = this.props;
    if (isFetching) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Header />
        <Queries />
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
