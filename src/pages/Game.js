import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components';
import Api from '../services/api';
import Answers from '../components/Answers';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };

    this.requestAsks = this.requestAsks.bind(this);
  }

  componentDidMount() {
    this.requestAsks();
  }

  async requestAsks() {
    const { returnAsks } = Api;
    const { token } = this.props;
    const resultAsks = await returnAsks(token);

    this.setState({
      questions: resultAsks.results,
    });
  }

  render() {
    const { questions } = this.state;

    if (questions.length === 0) return <p>Carregando...</p>;
    return (
      <div>
        <Header />
        <Answers questions={ questions } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
