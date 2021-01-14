import React from 'react';
import { connect } from 'react-redux';
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
  handleRequest(){

  }
  render() {
    return (
      <div>
         <Header />
          <div>
               <Questions />
            <button onclick={this.handleRequest}>Próxima</button>
          </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questionsAction: (questions) => dispatch(fetchQuestionsTrivia(questions)),
});

export default connect(null, mapDispatchToProps)(Game);
