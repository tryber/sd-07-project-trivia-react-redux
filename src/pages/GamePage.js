import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchThunk } from '../redux/actions';

class GamePage extends Component {
  constructor() {
    super();
    this.pergunta = this.pergunta.bind(this);
    this.select = this.select.bind(this);
    this.localset = this.localset.bind(this);
    // this.changeQUestions = this.changeQUestions.bind(this);
    this.changeQUestionsAndFinnish = this.changeQUestionsAndFinnish.bind(this);
    this.state = {
      indexx: 0,
      nextQuestion: false,
      finnish: false,
      time: 30,
      count: true,
      errado: { border: '2px solid rgb(0, 0, 0)' },
      certo: { border: '2px solid rgb(0, 0, 0)' },
      obj: {},
    };
  }

  componentDidMount() {
    const { fetchHere } = this.props;
    const interval = 1000;
    fetchHere();
    this.localset();
    setInterval(() => {
      this.decrementar();
    }, interval);
  }

  decrementar() {
    const { loading } = this.props;
    const { count, time } = this.state;
    if (count && !loading && time > 0) {
      this.setState((oldstate) => ({ time: oldstate.time - 1 }));
    }
    if (time === 0) {
      this.select('errado');
    }
  }

  localset() {
    const LS = JSON.parse(localStorage.getItem('state'));
    this.setState({ obj: LS });
  }

  select(pram, dif) {
    const { obj, time } = this.state;
    this.setState({ nextQuestion: true });
    let PD = 0;
    this.setState({
      errado: { border: '3px solid rgb(255, 0, 0)' },
      certo: { border: '3px solid rgb(6, 240, 15)' },
      count: false,
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
      const pontos = (2 * 2 * 2 + 2) + (time * PD);
      const total = pontos + obj.player.score;
      const acertos = obj.player.assertions + 1;
      const objobj = obj;
      objobj.player.score = total;
      objobj.player.assertions = acertos;
      this.setState({ obj: objobj });
      localStorage.setItem('state', JSON.stringify(objobj));
    }
  }

  changeQUestionsAndFinnish() {
    const { indexx } = this.state;
    const numberFour = 4;
    if (indexx === numberFour) {
      this.setState({ finnish: true });
    } else {
      this.setState((prevState) => ({
        indexx: prevState.indexx + 1,
        nextQuestion: false,
        time: 30,
        count: true,
        errado: { border: '2px solid rgb(0, 0, 0)' },
        certo: { border: '2px solid rgb(0, 0, 0)' } }
      ));
    }
  }

  pergunta() {
    const { questions } = this.props;
    const { indexx, errado, certo, time, count } = this.state;
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
            disabled={ !count }
            onClick={ () => this.select('certo', questao.difficulty) }
          >
            {questao.correct_answer}
          </button>
          { questao.incorrect_answers.map((msg, index) => (
            <button
              type="button"
              key={ index }
              style={ errado }
              disabled={ !count }
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => this.select('errado') }
            >
              {msg}
            </button>
          ))}
          <p>{`tempo: ${time}`}</p>
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.props;
    const { nextQuestion, finnish } = this.state;
    return (
      <div>
        <Header />
        { loading ? <p>loading</p> : this.pergunta() }
        <Link to="/feedback">Feedback</Link>
        {nextQuestion && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.changeQUestionsAndFinnish }
          >
            Next
          </button>
        )}
        {finnish && <Redirect to="/feedback" />}
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
