import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Questions from "../Components/Questions";
import { fetchQuestions } from "../actions";
import Header from "../Components/Header";

class QuestionsPage extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    const questionsList = fetchQuestions(token);
  }

  fetchQuestions(token) {
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    fetch(URL)
      .then((response) => response.json())
      .then((obj) => {
        if (obj.response_code === 0) {
          const questions = obj.results;
          return questions;
        }
      });
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
