import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Questions, Header } from '../components';
import { fetchQuestionsTrivia } from '../actions/fetchQuestionsTrivia';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI() {
    const { questionsAction } = this.props;
    questionsAction();
  }

  handleRequest() {
    const index = 0;
    return index;
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <Questions />
          <button type="button" onClick={ this.handleRequest }>Próxima</button>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  questionsAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  questionsAction: (questions) => dispatch(fetchQuestionsTrivia(questions)),
});

export default connect(null, mapDispatchToProps)(Game);
