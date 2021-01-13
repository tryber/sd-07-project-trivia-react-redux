import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Questions from '../Components/Questions';
import { fetchQuestions } from '../actions';
import Header from '../Components/Header';

class QuestionsPage extends React.Component {
  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { questionsGen } = this.props;

    await questionsGen(token);
  }

  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questionsGen: (token) => dispatch(fetchQuestions(token)),
});

QuestionsPage.propTypes = {
  questionsGen: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(QuestionsPage);
