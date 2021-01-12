import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import fetchThunk from '../redux/actions';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      atualAction: [],
      index: 0,
    };
  }

  componentDidMount() {
    const { fetchHere } = this.props;
    fetchHere();
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ questions }</p>
        <div>
          map aqui
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHere: () => dispatch(fetchThunk()),
});

GamePage.propTypes = {
  fetchHere: PropTypes.func.isRequired,
  // loading: PropTypes.string.isRequired,
  questions: PropTypes.shape({
    responseCode: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(PropTyes.object).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
