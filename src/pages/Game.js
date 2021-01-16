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
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const { questionsAction } = this.props;
    await questionsAction();
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <Questions />
          <button type="button">Próxima</button>
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
