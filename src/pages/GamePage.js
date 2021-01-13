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
    this.select = this.select.bind(this);
    this.localset = this.localset.bind(this);
    this.state = {
      indexx: 0,
      errado: { border: '2px solid rgb(0, 0, 0)' },
      certo: { border: '2px solid rgb(0, 0, 0)' },
      obj: {},
    };
  }

  componentDidMount() {
    const { fetchHere } = this.props;
    fetchHere();
    this.localset();
  }

  localset() {
    const LS = JSON.parse(localStorage.getItem('state'));
    this.setState({ obj: LS });
  }

  select(pram, dif) {
    const { obj } = this.state;
    let PD = 0;
    this.setState({
      errado: { border: '3px solid rgb(255, 0, 0)' },
      certo: { border: '3px solid rgb(6, 240, 15)' },
    });
    switch (dif) {
    case 'easy':
      PD = 1;
      break;
    case 'medium':
      PD = 2;
      break;
    case 'hard':
      PD = (1 + 2);
      break;
    default:
      break;
    }
    if (pram === 'certo') {
      const pontos = (2 * 2 * 2 + 2) + (1 * PD);
      const total = pontos + obj.player.score;
      const objobj = obj;
      objobj.player.score = total;
      this.setState({ obj: objobj });
      localStorage.setItem('state', JSON.stringify(objobj));
    }
  }

  pergunta() {
    const { questions } = this.props;
    const { indexx, errado, certo } = this.state;
    const questao = questions.results[indexx];
    return (
      <div>
        <p data-testid="question-category">{ questao.category }</p>
        <p data-testid="question-text">{ questao.question }</p>
        <div>
          <button
            data-testid="correct-answer"
            type="button"
            style={ certo }
            onClick={ () => this.select('certo', questao.difficulty) }
          >
            {questao.correct_answer}
          </button>
          { questao.incorrect_answers.map((msg, index) => (
            <button
              type="button"
              key={ index }
              style={ errado }
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => this.select('errado') }
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
