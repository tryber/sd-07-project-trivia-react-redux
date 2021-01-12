import React, { Component } from 'react';
import Header from '../components/Header';
import requestQuest from '../store/ducks/QuestionsRequest/actions'
import { connect } from 'react-redux';

class GameScreen extends Component {

  async componentDidMount(){
    const { actionRequest } = this.props;
    await actionRequest();
  }


  render() {
    const { quest } = this.props;
    return (

      <div >
      <div><Header /></div>
        {quest.map(({ category, question }) => (
          <div>
            <div data-testid="question-category" >
              {category}
            </div>
            <div data-testid="question-text">
              {question}
            </div>
          </div>
        ))}
      </div>

    );
  }

}

const mapStateToProps = ({ QuestionRequest: { quest } }) => ({
  quest,
});
const mapDispatchToProps = { actionRequest: requestQuest }

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);