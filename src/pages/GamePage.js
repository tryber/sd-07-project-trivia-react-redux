import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { fetchThunk } from '../redux/actions';

class GamePage extends Component {
  constructor() {
    super();
    this.pergunta = this.pergunta.bind(this);
    this.state = {
      indexx: 0,
    };
  }

  componentDidMount() {
    const { fetchHere } = this.props;
    fetchHere();
  }

  pergunta() {
    const { questions } = this.props;
    const { indexx } = this.state;
    const questao = questions.results[indexx];
    return (
      <div>
        <p data-testid="question-category">{ questao.category }</p>
        <p data-testid="question-text">{ questao.question }</p>
        <div>
          <button
            data-testid="correct-answer"
            type="button"
            onClick={ () => console.log('ritapediu') }
          >
            {questao.correct_answer}
          </button>
          { questao.incorrect_answers.map((msg, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => console.log('carolpediu') }
            >
              {msg}
            </button>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        <Header />
        { loading ? <p>loading</p> : this.pergunta() }
        <Link to="/feedback">Feedback</Link>
        <button type="button" data-testid="btn-next">Next</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHere: () => dispatch(fetchThunk(dispatch)),
});

GamePage.propTypes = {
  fetchHere: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.shape({
    responseCode: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
