import React from 'react';
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
    console.log(token);
    const resultAsks = await returnAsks(token);
    this.setState({
      questions: resultAsks.results,
    });
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    if (questions === []) {
      return <h1>Carregando...</h1>;
    }
    return (
      <div>
        <Header />
        {/* <Answers questions={ questions } /> */}
        <div>Contagem regressiva</div>
        <button type="button">Próxima</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
});

// Header.propTypes = {
//   email: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps)(Game);
