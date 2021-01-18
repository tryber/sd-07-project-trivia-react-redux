import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Trivia from '../components/Trivia';
import { fetchQuestions } from '../redux/actions';
import { requestToken } from '../services/api';

class Play extends Component {
  async componentDidMount() {
    const { fetchTrivia } = this.props;
    await requestToken();
    fetchTrivia();
  }

  render() {
    return (
      <div>
        <Header />
        <Trivia />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTrivia: () => dispatch(fetchQuestions()),
});

export default connect(null, mapDispatchToProps)(Play);

Play.propTypes = {
  fetchTrivia: PropTypes.func.isRequired,
};
