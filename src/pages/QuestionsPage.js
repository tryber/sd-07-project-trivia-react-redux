import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Questions from '../Components/Questions';
import { fetchQuestions } from '../actions';

class QuestionsPage extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    const { questionsGen } = this.props;

    questionsGen(token);
  }

  render() {
    return <Questions />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  questionsGen: (token) => dispatch(fetchQuestions(token)),
});

QuestionsPage.propTypes = {
  questionsGen: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(QuestionsPage);
