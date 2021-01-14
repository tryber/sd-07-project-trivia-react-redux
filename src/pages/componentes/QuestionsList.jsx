import React from 'react';
import { connect } from 'react-redux';
class QuestionsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      array: [],
    }

    this.shuffle = this.shuffle.bind(this);
    this.mountArrayOfAnswer = this.mountArrayOfAnswer.bind(this);
  }

  componentDidMount() {
    setTimeout(() => { this.mountArrayOfAnswer(); }, 3000);
  }

  shuffle(array) {
    for (var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
  }

  mountArrayOfAnswer() {
      const { question } = this.props;
      const correct = question.results[0].correct_answer;
      const incorrect = question.results[0].incorrect_answers;
      const array = [correct, ...incorrect];
      console.log(array);
      const randomArray = this.shuffle(array);
      this.setState({array: randomArray });
      console.log(this.state.array);
    }

/* var alpha = ["a", "b", "c"];
var numeric = [1, 2, 3];
// creates array ["a", "b", "c", 1, 2, 3]; alpha and numeric are unchanged
var alphaNumeric = alpha.concat(numeric); */

  render() {
    const { array } = this.state;
    const { question } = this.props;
    const correto = question.results[0].correct_answer
    return(
      <div>
        { array.map((answers) => {
          if(answers === correto) {
            return <button
              type="button"
              
            >
              { answers }
            </button>
          }
          return <button
            type="button"
          >
            { answers }
          </button>
        }
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.player.question,
});

export default connect(mapStateToProps)(QuestionsList);
