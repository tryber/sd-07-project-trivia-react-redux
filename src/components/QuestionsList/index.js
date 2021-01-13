import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionsList extends Component {
  render() {
    const { list } = this.props;
    if (!list[0]) return <h1>...Carregando</h1>;
    return (
      <div>
        <span data-testid="question-category">{list[0].category}</span>
        <h1 data-testid="question-text">{list[0].question}</h1>
        <button type="button" data-testid="correct-answer">
          {list[0].correct_answer}
        </button>
        {list[0].incorrect_answers.map((incorrect, index) => (
          <button type="button" key={ incorrect } data-testid={ `wrong-answer-${index}` }>
            { incorrect }
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.game.QuestionsList,
});

QuestionsList.propTypes = {
  list: PropTypes.shape(PropTypes.array).isRequired,
};

export default connect(mapStateToProps)(QuestionsList);
